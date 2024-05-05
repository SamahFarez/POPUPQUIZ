from flask import Flask, Response
import json

app = Flask(__name__)

def generate_pdf(data):
    # Initialize the PDF content with the title
    pdf_content = "Quiz Attendance\n\n"

    # Add each student's name and mark to the PDF content
    for student in data:
        pdf_content += f"{student['name']}: {student.get('mark', 0)}\n"

    return pdf_content

@app.route('/download-pdf')
def download_pdf():
    with open('POPUPQUIZ/Data/quiz_data.json') as file:
        quiz_data = json.load(file)
        pdf_content = generate_pdf(quiz_data)

    # Send PDF as a response
    return Response(pdf_content, mimetype='application/pdf', headers={
        'Content-Disposition': 'attachment; filename=quiz_attendance.pdf'
    })

if __name__ == "__main__":
    app.run(debug=True)  # Run the Flask app
