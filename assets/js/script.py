from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import json
from langchain_core.output_parsers import StrOutputParser
from langchain_community.document_loaders import PyPDFLoader
from langchain.prompts import PromptTemplate
from operator import itemgetter
from langchain_community.vectorstores import DocArrayInMemorySearch
import json
from langchain_community.llms import Ollama
from langchain_community.embeddings import OllamaEmbeddings




def my_python_function():
    MODEL = "llama3"
    model = Ollama(model=MODEL)
    embeddings = OllamaEmbeddings(model=MODEL)
    parser = StrOutputParser()
    template = """
Answer the question based on the context below. If you can't 
answer the question, reply "I don't know".

Context: {context}

Question: {question}
"""

    prompt = PromptTemplate.from_template(template)

    loader = PyPDFLoader("assets/js/AI_Fest_Challenge.pdf")
    pages = loader.load_and_split()
    
    vectorstore = DocArrayInMemorySearch.from_documents(pages, embedding=embeddings)
    retriever = vectorstore.as_retriever()
    retriever.invoke("challenge")
    
    chain = (
    {
        "context": itemgetter("question") | retriever,
        "question": itemgetter("question"),
    }
    | prompt
    | model
    | parser
)
    
    questions = [
    """create a quiz of 5 questions with multiple choice, make sur to get them in this json format and do not include anything else besides the generated data structure, for example
    {
    question: "What is the capital of France?",
    options: [
      { text: "Paris", isCorrect: true },
      { text: "Madrid", isCorrect: false },
      { text: "Berlin", isCorrect: false }
    ]
  },
    
    """,
]

    for question in questions:
        response = chain.invoke({'question': question})
    

        # Given string
        input_string = response
        # Correcting the format
        input_string = input_string.replace('\n', '').replace('False', '"False"').replace('True', '"True"')
        input_string = input_string.replace('question:', '"question":').replace('options:', '"options":')
        input_string = input_string.replace('text:', '"text":').replace('isCorrect:', '"isCorrect":')

        # Adding square brackets to make it a valid JSON array
        input_string = '[' + input_string + ']'

        # Parse the string into JSON
        json_data = json.loads(input_string)
        
        print("json_data: ", json_data)
        
        return json_data

class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/my_python_function':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')  # Allow requests from any origin
            self.end_headers()
            response = my_python_function()
            self.wfile.write(json.dumps(response).encode())
        else:
            self.send_response(404)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write("404 Not Found".encode())

def run(server_class=HTTPServer, handler_class=MyServer, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"Server running on port {port}")
    httpd.serve_forever()

if __name__ == "__main__":
    run()
