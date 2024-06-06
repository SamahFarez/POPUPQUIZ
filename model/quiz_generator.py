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

## load the GROQ And OpenAI API KEY 
groq_api_key=os.getenv('GROQ_API_KEY')
os.environ["GOOGLE_API_KEY"]=os.getenv("GOOGLE_API_KEY")

llm = ChatGroq(groq_api_key=groq_api_key,
               model_name="Llama3-8b-8192")

prompt = ChatPromptTemplate.from_template(
"""
Answer the questions based on the provided context only.
Please provide the most accurate response based on the question, Make sure the result should be only a json format only, nothing like: here is the result or something, just answer directly
<context>
{context}
<context>
Questions:{input}
"""
)

def vector_embedding(embeddings, loader, text_splitter, num_docs=20):
    docs = loader.load()
    final_documents = text_splitter.split_documents(docs[:num_docs])
    vectors = FAISS.from_documents(final_documents, embeddings)
    return vectors

# Example usage:
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)

prompt1 = """Generate a JSON object comprising 5 questions, each with multiple-choice options and only one correct answer. Ensure the JSON structure adheres strictly to the specified format and contains no additional information or introductory text like "Here is the quiz in JSON format:". The JSON should begin with "{" and end with "}". Do not modify the keys or add anything to them (question, options, text, isCorrect) for each generated question. Follow this format:

Example JSON Format:
[
      {
        question: "What is the capital of France?",
        options: [
          { text: "Paris", isCorrect: true },
          { text: "Madrid", isCorrect: false },
          { text: "Berlin", isCorrect: false }
        ]
      },
      {
        question: "What is the capital of Spain?",
        options: [
          { text: "Paris", isCorrect: false },
          { text: "Madrid", isCorrect: true },
          { text: "Berlin", isCorrect: false }
        ]
      }
]

make sure to generate 5 questions
"""

# def result(prompt, llm, vectors, prompt1):
#     document_chain = create_stuff_documents_chain(llm, prompt)
#     retriever = vectors.as_retriever()
#     retrieval_chain = create_retrieval_chain(retriever, document_chain)
#     start = time.process_time()
#     response = retrieval_chain.invoke({'input': prompt1})
#     print("Response time:", time.process_time() - start)
#     return response['answer']


def result(prompt, llm, vectors, prompt1):
    while True:
        document_chain = create_stuff_documents_chain(llm, prompt)
        retriever = vectors.as_retriever()
        retrieval_chain = create_retrieval_chain(retriever, document_chain)
        start = time.process_time()
        response = retrieval_chain.invoke({'input': prompt1})
        print("Response time:", time.process_time() - start)

        try:
            json_object = json.loads(response['answer'])
            print("Output is in valid JSON format.")
            first_key = list(json_object.keys())[0]
            if first_key != "questions":
                # If not, wrap the whole object under "questions"
                json_object = {"questions": json_object}
            return json_object
        except json.decoder.JSONDecodeError as e:
            print("Output is not in valid JSON format:", e)
            print("JSON verification failed. Repeating the generation process...")
            # new_response= retrieval_chain.invoke({'input': f"Make the output a valid JSON format: {response['answer']}"})
            # verification_answer = new_response['answer']
            # try:
            #     json_object = json.loads(verification_answer)
            #     print("JSON verification successful.")
            #     first_key = list(json_object.keys())[0]
            #     if first_key != "questions":
            #         # If not, wrap the whole object under "questions"
            #         json_object = {"questions": json_object}
            #     return json_object
            # except Exception:
            #     print("JSON verification failed. Repeating the generation process...")
            #     continue

def generate_quiz_from_pdf(pdf_path):
    loader = PyPDFLoader(pdf_path)
    vectors = vector_embedding(embeddings, loader, text_splitter)
    return result(prompt, llm, vectors, prompt1)
