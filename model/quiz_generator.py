import os
from flask import json
from langchain_groq import ChatGroq
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyPDFLoader
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from dotenv import load_dotenv
import json
import time

load_dotenv()

# Load the GROQ and OpenAI API KEY
groq_api_key = os.getenv('GROQ_API_KEY')
os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")

llm = ChatGroq(groq_api_key=groq_api_key,
               model_name="Llama3-70b-8192")

prompt = ChatPromptTemplate.from_template(
    """
    Answer the questions based on the provided context only.
    Please provide the most accurate response based on the question, Make sure the result should be only a json format only, nothing like: here is the result or something alike, just answer directly
    <context>
    {context}
    <context>
    Questions:{input}
    """
)

quiz_format = [
    {
        "question": "What is the capital of France?",
        "options": [
            { "text": "Paris", "isCorrect": True },
            { "text": "Madrid", "isCorrect": False },
            { "text": "Berlin", "isCorrect": False }
        ]
    },
    {
        "question": "What is the capital of Spain?",
        "options": [
            { "text": "Paris", "isCorrect": False },
            { "text": "Madrid", "isCorrect": True },
            { "text": "Berlin", "isCorrect": False }
        ]
    }
]

def vector_embedding(embeddings, loader, text_splitter, num_docs=20):
    docs = loader.load()
    final_documents = text_splitter.split_documents(docs[:num_docs])
    vectors = FAISS.from_documents(final_documents, embeddings)
    return vectors

# Example usage:
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)

prompt1 = f"""Generate a JSON object comprising 5 questions (Why, how, what questions), each with multiple-choice options and only one correct answer. Ensure the JSON structure adheres strictly to the specified format and contains no additional information or introductory text like "Here is the quiz in JSON format:". The JSON should begin with "{" and end with "}". Do not modify the keys or add anything to them (question, options, text, isCorrect) for each generated question. Follow this format:

Example JSON Format:

{quiz_format}

make sure to generate 5 questions
"""

def result(prompt, llm, vectors, prompt1):
    while True:
        document_chain = create_stuff_documents_chain(llm, prompt)
        retriever = vectors.as_retriever()
        retrieval_chain = create_retrieval_chain(retriever, document_chain)
        start = time.process_time()
        response = retrieval_chain.invoke({'input': prompt1})
        print("Response time:", time.process_time() - start)
        correction_prompt = f"You are an expert MCQ reviewer, your job is to review this generated quiz If you find any repeated question or repeated option within a question options, and make sure that there are 5 questions and there is exactly one correct option within a question and the others options are incorrect, update it properly, quiz: {response['answer']}. The output must be on json format the same format as {quiz_format}""}"
        correction_response = retrieval_chain.invoke({'input': correction_prompt})
        try:
            json_object = json.loads(correction_response['answer'])
            print("Output is in valid JSON format.")
            return json_object
        except json.decoder.JSONDecodeError as e:
            print("Output is not in valid JSON format:", e)
            print("JSON verification failed. Repeating the generation process with correction...")

            # Create a correction prompt
            correction_prompt = f"Correct this output to be a valid JSON format: {correction_response['answer']}"
            correction_response = retrieval_chain.invoke({'input': correction_prompt})
            print("Correction attempt response:", correction_response)

            try:
                json_object = json.loads(correction_response['answer'])
                print("Output is in valid JSON format after correction.")
                return json_object
            except json.decoder.JSONDecodeError as e:
                print("Correction attempt failed. Repeating the generation process...")

def generate_quiz_from_pdf(pdf_path):
    loader = PyPDFLoader(pdf_path)
    vectors = vector_embedding(embeddings, loader, text_splitter)
    return result(prompt, llm, vectors, prompt1)

# Example call to the generate_quiz_from_pdf function (provide your PDF path)
# quiz = generate_quiz_from_pdf("path_to_your_pdf.pdf")
# print(json.dumps(quiz, indent=4))
