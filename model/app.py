# Server 1: File Upload and Quiz Generation
from flask import Flask, json, request, jsonify
import os
from werkzeug.utils import secure_filename
from quiz_generator import generate_quiz_from_pdf
from flask_cors import CORS

app_upload = Flask(__name__)
app_upload.config['UPLOAD_FOLDER'] = 'uploads'
CORS(app_upload)

@app_upload.route('/generate_quiz', methods=['POST'])
def generate_quiz():
    if 'document' not in request.files:
        return jsonify({'error': 'No document uploaded'}), 400

    document = request.files['document']
    if document.filename == '':
        return jsonify({'error': 'No document uploaded'}), 400

    filename = secure_filename(document.filename)
    document_path = os.path.join(app_upload.config['UPLOAD_FOLDER'], filename)
    document.save(document_path)

    # Process the uploaded PDF file and generate the quiz
    quiz_data = generate_quiz_from_pdf(document_path)
    
    print(quiz_data)    
    # input_string = quiz_data
    #     # Parse the string into JSON
    # json_data = json.loads(input_string)
        
    # print("json_data: ", json_data)

    # Delete the uploaded file after processing
    os.remove(document_path)

    return jsonify({'message': 'Quiz generated successfully', 'quiz_data': quiz_data}), 200

if __name__ == '__main__':
    os.makedirs(app_upload.config['UPLOAD_FOLDER'], exist_ok=True)
    app_upload.run(debug=True, host='0.0.0.0', port=8001)
