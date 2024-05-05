// Function to download the PDF file

function downloadPDF() {
  // Assuming the endpoint for downloading the PDF is '/download-pdf'
  var fileURL = '/download-pdf';
  var fileName = 'quiz_attendance.pdf';

  fetch(fileURL)
    .then(response => response.blob())
    .then(blob => {
      // Create a blob URL representing the PDF file
      var blobURL = URL.createObjectURL(blob);
      
      // Create a temporary link element to trigger the download
      var a = document.createElement('a');
      a.href = blobURL;
      a.download = fileName;
      
      // Append the link to the document body and trigger the click event
      document.body.appendChild(a);
      a.click();
      
      // Clean up by removing the temporary link
      document.body.removeChild(a);
    })
    .catch(error => console.error('Error downloading PDF:', error));
}

// First DOMContentLoaded event listener for fetching and displaying attendance data
document.addEventListener("DOMContentLoaded", function() {
  fetch('Data/quiz_data.json')

      .then(response => response.json())
      .then(data => {
        const attendanceTable = document.getElementById('attendanceTable');
  
        // Clear any existing rows in the table body
        attendanceTable.innerHTML = '';
  
        // Loop through the data and create a row for each student
        data.forEach(student => {
          const row = document.createElement('tr');
  
          // Create cells for student name and quiz mark
          const nameCell = document.createElement('td');
          nameCell.textContent = student.name;
          row.appendChild(nameCell);
  
          const markCell = document.createElement('td');
          markCell.textContent = student.mark;
          row.appendChild(markCell);
  
          // Append the row to the table body
          attendanceTable.appendChild(row);
        });
      });
});

// Second DOMContentLoaded event listener for other functionality (e.g., creating the graph)
document.addEventListener("DOMContentLoaded", function() {
  fetch('Data/quiz_data.json')

      .then(response => response.json())
      .then(data => {
        // Code for creating the graph goes here
        
      });
});
