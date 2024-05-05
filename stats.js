// Function to fetch data from quiz_data.json
async function fetchData() {
  try {
      const response = await fetch('Data/quiz_data.json');
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching data:', error);
      return [];
  }
}

// Function to generate and display pie chart
async function generatePieChartAndDisplayAverage() {
  // Fetch data from quiz_data.json
  const data = await fetchData();

  // Extract marks from the data
  const marks = data.map(student => student.mark || 0);

  // Count the number of students for each mark
  const markCounts = {};
  marks.forEach(mark => {
      markCounts[mark] = (markCounts[mark] || 0) + 1;
  });

  // Extract unique marks and their counts
  const uniqueMarks = Object.keys(markCounts).map(Number);
  const counts = Object.values(markCounts);

  // Generate the pie chart
  const ctx = document.getElementById('pieChart').getContext('2d');
  new Chart(ctx, {
      type: 'pie',
      data: {
          labels: uniqueMarks,
          datasets: [{
              label: 'Number of Students',
              data: counts,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.5)',
                  'rgba(54, 162, 235, 0.5)',
                  'rgba(255, 206, 86, 0.5)',
                  'rgba(75, 192, 192, 0.5)',
                  'rgba(153, 102, 255, 0.5)',
                  'rgba(255, 159, 64, 0.5)'
              ]
          }]
      },
      options: {
          title: {
              display: true,
              text: 'Distribution of Quiz Marks'
          }
      }
  });

  // Calculate the average mark
  const averageMark = marks.reduce((total, mark) => total + mark, 0) / marks.length;

  // Display the average mark
  const averageMarkElement = document.getElementById('averageMark');
  averageMarkElement.textContent = `Average Mark: ${averageMark.toFixed(2)}`;
}

// Call the function to generate pie chart and display average mark
generatePieChartAndDisplayAverage();
