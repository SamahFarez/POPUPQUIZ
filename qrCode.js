
<script src="https://cdn.jsdelivr.net/npm/qrcode@1.4.4/dist/qrcode.min.js"></script>

function generateQRCode(quizData) {
  // Clear previous QR code if any
  document.getElementById('qr-code-container').innerHTML = '';

  // Generate QR code using quizData
  var qr = new QRCode(document.getElementById('qr-code-container'), {
    text: JSON.stringify(quizData), // Convert quiz data to JSON string
    width: 200,
    height: 200
  });
}

// Event listener for the "Validate Quiz" button
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('validate-quiz-button').addEventListener('click', function() {
    // Sample quiz data (replace with actual quiz data)
    var quizData = {
      questions: [
        {
          question: "What is the capital of France?",
          options: ["Paris", "Rome", "Madrid", "Berlin"],
          correctOption: 0
        },
        {
          question: "What is 2 + 2?",
          options: ["3", "4", "5", "6"],
          correctOption: 1
        }
        // Add more questions here if needed
      ]
    };

    // Call generateQRCode function with quizData
    generateQRCode(quizData);
  });
});