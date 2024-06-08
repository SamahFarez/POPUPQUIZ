/**
* Template Name: Myquiz_section
* Updated: Jan 29 2024 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

document.addEventListener('DOMContentLoaded', function () {
  // Get a reference to the button
  var startGenerationButton = document.getElementById('start-generation');

  // Add a click event listener to the button
  startGenerationButton.addEventListener('click', function () {
    // Scroll to the #about section using smooth behavior
    document.querySelector('#about').scrollIntoView({
      behavior: 'smooth'
    });
  });
});
document.addEventListener('DOMContentLoaded', function () {
  // Get a reference to the button
  var startGenerationButton = document.getElementById('start-generation2');

  // Add a click event listener to the button
  startGenerationButton.addEventListener('click', function () {
    // Scroll to the #about section using smooth behavior
    document.querySelector('#quiz_section').scrollIntoView({
      behavior: 'smooth'
    });
  });
});
document.addEventListener('DOMContentLoaded', function () {
  // Get a reference to the button
  var startGenerationButton = document.getElementById('validate-quiz-button');

  // Add a click event listener to the button
  startGenerationButton.addEventListener('click', function () {
    // Scroll to the #about section using smooth behavior
    document.querySelector('#timer').scrollIntoView({
      behavior: 'smooth'
    });
  });
});
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()
/*
Model part
*/
function findQuestions(data) {
  let result = null;

  // Check if the current data is an object
  if (typeof data === 'object' && data !== null) {
    // If "questions" key is found, return its value
    if ('questions' in data) {
      return data['questions'];
    } else {
      // Recursively search through the object
      Object.keys(data).some(key => {
        result = findQuestions(data[key]);
        return result !== null; // Stop iteration if "questions" found
      });
    }
  }

  return result;
}


var quizData


async function callPythonFunction() {

  try {

    document.getElementById('loading-message').style.display = 'block';
    console.log("button clicked");
    var formData = new FormData();
    formData.append('document', document.getElementById('pdf-file').files[0]);

    const response = await fetch('http://localhost:8001/generate_quiz', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log("quiz data : ", data);
    quizData =  await data.quiz_data;
    // console.log(quizData); // Output: What was the purpose of transforming categorical features into numerical values?
    // quizData = await findQuestions(data.quiz_data);
    // console.log(quizData);

    generateQuizHTML();
    handleAddQuestionButton();
    attachCheckboxListeners(); // Attach checkbox event listeners
    handleIconClicks();
    quizDisplay();
  } catch (error) {
    console.error("Request failed:", error.message);
    alert("Request failed: " + error.message);
  } finally {
    document.getElementById('loading-message').style.display = 'none';
  }
}



/* 
Quiz Part
*/

// Sample data structure containing quiz questions
// var quizData = [
//   {
//     question: "What is the capital of France?",
//     options: [
//       { text: "Paris", isCorrect: true },
//       { text: "Madrid", isCorrect: false },
//       { text: "Berlin", isCorrect: false }
//     ]
//   },
//   {
//     question: "What is the capital of Spain?",
//     options: [
//       { text: "Paris", isCorrect: false },
//       { text: "Madrid", isCorrect: true },
//       { text: "Berlin", isCorrect: false }
//     ]
//   },
// ];


//to use it for url qr code

var code_url = "";
var formId;





// Function to generate quiz HTML from data
function generateQuizHTML() {
  var quizDisplaySection = document.getElementById("quizDisplaySection");
  quizDisplaySection.innerHTML = "";
  console.log("start the generation....")

  console.log(quizData)
  // Loop through each question in the quiz data
  quizData.forEach(function (questionData, index) {
    var questionNumber = index + 1;
    var questionHTML = `
            <div class="quiz-question">
              <strong class="question-title">Question ${questionNumber}:</strong>
              <div class="question-text">
                <span class="question-text-content">${questionData.question}</span>
                <!-- Replace button with box-icon -->
                <div class="question-buttons">
                  <box-icon name='edit' color='#001d43'></box-icon>
                  <box-icon name='trash' color='#001d43'></box-icon>
                </div>
              </div>
              <ul class="answer-options">`;

    // Loop through each option for the current question
    questionData.options.forEach(function (option, optionIndex) {
      console.log(optionIndex)
      var isChecked = option.isCorrect ? "checked" : "";
      var liStyle = isChecked ? "correct-answer" : ""; // Add style if option is correct answer
      questionHTML += `
              <li class="${liStyle}"><input type="checkbox" name="q${questionNumber}" value="${optionIndex}" ${isChecked}> ${option.text}</li>`;
    });

    questionHTML += `
              </ul>
            </div>`;

    quizDisplaySection.innerHTML += questionHTML;
  });
}

// Call the function to generate quiz HTML on page load
window.onload = function () {

};

// Function to attach event listeners to checkboxes

function attachCheckboxListeners() {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');

  console.log("something cheecked");
  // Loop through each checkbox
  checkboxes.forEach(function (checkbox) {
    // Add event listener for change event
    checkbox.addEventListener('change', function () {
      const questionIndex = parseInt(this.name.replace("q", "")) - 1;
      const optionIndex = parseInt(this.value);

      // Check if the checkbox is checked
      if (this.checked) {
        // If checked, add class to the parent <li> element
        this.parentElement.classList.add('correct-answer');
        quizData[questionIndex].options[optionIndex].isCorrect = true;
      } else {
        // If not checked, remove the class
        this.parentElement.classList.remove('correct-answer');
        quizData[questionIndex].options[optionIndex].isCorrect = false;
      }
      console.log(quizData)
    });
  });
}

function handleIconClicks() {
  // Function to handle icon clicks (edit, save, or trash)
  const iconCont = document.getElementById('quizDisplaySection');
  iconCont.addEventListener('click', (event) => {
    if (event.target.tagName === 'BOX-ICON') { // Check if the clicked element is a box-icon
      const icon = event.target;
      const div = icon.closest('.quiz-question');

      const questionIndex = Array.from(iconCont.children).indexOf(div);


      if (icon.getAttribute('name') === 'edit') {
        const span = div.querySelector('span');
        const input = document.createElement('input');
        input.type = 'text';
        input.value = span.textContent.trim();

        input.classList.add('edit-field');
        // Replace span with input for editing
        span.replaceWith(input);

        icon.setAttribute('name', 'save'); // Change icon to 'save'
      } else if (icon.getAttribute('name') === 'save') {
        const input = div.querySelector('input');
        const span = document.createElement('span');
        span.textContent = input.value.trim();

        span.classList.add('edited-field');
        // Replace input with span after editing
        input.replaceWith(span);

        quizData[questionIndex].question = span.textContent;
        console.log(quizData)
        icon.setAttribute('name', 'edit'); // Change icon back to 'edit'

      } else if (icon.getAttribute('name') === 'trash') {
        quizData.splice(questionIndex, 1);
        div.remove();
        console.log(quizData)
        updateQuestionNumbering();
      }
    }
  });
}
function updateQuestionNumbering() {
  const quizQuestions = document.querySelectorAll('.quiz-question');
  quizQuestions.forEach((question, index) => {
    question.querySelector('.question-title').textContent = `Question ${index + 1}:`;
  });
}
function handleAddQuestionButton() {
  newQuestionNum = quizData.length + 1
  document.addEventListener('click', function (event) {
    const questionInput = document.querySelector('#questionInput');
    const answerOptionInputs = document.querySelectorAll('.answer-option');
    const nonEmptyInputs = Array.from(answerOptionInputs).filter(function (input) {
      return input.value.trim() !== '';
    });
    const buttonText = event.target.textContent.trim(); // Getting the text content of the button and removing extra spaces
    console.log("Button clicked"); // Log to console when button is clicked

    if (event.target.classList.contains('btn-primary')) {
      if (buttonText === 'Add Question') { // Checking if the button text is 'Add Question'
        const quizEditingSection = document.querySelector('#quizEditingSection');
        if (quizEditingSection) {
          quizEditingSection.style.display = 'block'; // Showing the quiz editing section
          event.target.style.display = 'none';
          console.log("Quiz editing section displayed"); // Log to console when quiz editing section is displayed
        }
      } else if (buttonText === 'Add The Question' && mostFieldsFilled(questionInput, answerOptionInputs)) {
        // add it to the data structure
        const questionInputValue = questionInput.value.trim();
        const answerOptions = Array.from(nonEmptyInputs).map(input => {
          return { text: input.value.trim(), isCorrect: false };
        });

        // Adding the new question to quizData
        quizData.push({
          question: questionInputValue,
          options: answerOptions
        });
        // Construct the new question structure
        console.log("new question added: ", quizData );
        const newQuestion = document.createElement('div');
        newQuestion.classList.add('quiz-question');
        const answerOptionInputsArray = Array.from(nonEmptyInputs);
        let answerOptionsHTML = '';

        answerOptionInputsArray.forEach(function (option, optionIndex) {
          answerOptionsHTML += `
                      <li><input type="checkbox" name="q${newQuestionNum}" value="${optionIndex}"> ${option.value}</li>`;
        });
        newQuestion.innerHTML = `
        <strong class="question-title">New Question:</strong>
        <div class="question-text">
        <span class="question-text-content">${questionInput.value}</span>
        <!-- Replace button with box-icon -->
        <div class="question-buttons">
          <box-icon name='edit' color='#001d43'></box-icon>
          <box-icon name='trash' color='#001d43'></box-icon>
        </div>
        </div>
        <ul class="answer-options">
          ${answerOptionsHTML}
            </ul>
        `;

        // Append the new question to the quiz section
        const quizSection = document.getElementById('quizDisplaySection');
        quizSection.appendChild(newQuestion);

        // Optionally, you can clear the input fields
        questionInput.value = '';
        answerOptionInputs.forEach(input => input.value = '');

        // Optionally, display a remark
        updateQuestionNumbering()
        attachCheckboxListeners()
        console.log(quizData)
        //remove the added fields
        const answerOptionsList = document.querySelector('.answer-options-div');
        const excessFields = answerOptionsList.children.length - 2;
        for (let i = 0; i < excessFields; i++) {
          answerOptionsList.removeChild(answerOptionsList.lastChild);
        }
      }

    } else if (event.target.classList.contains('btn-secondary')) {
      console.log("secondary button clicked");
      if (buttonText === 'Add Answer Field') { // Checking if the button text is 'Add Answer Field'
        console.log("Add Answer Field clicked")
        const quizEditingSection = document.querySelector('#quizEditingSection');

        if (areFieldsFilled(questionInput, answerOptionInputs)) {
          const answerOption = document.createElement('li');
          answerOption.innerHTML = `<input type='text' class='answer-option form-control mb-2' placeholder='Enter Answer Option'>`;
          const answerOptionsList = quizEditingSection.querySelector('.answer-options-div');
          answerOptionsList.appendChild(answerOption);

        }
      }
    }
  });

}
function areFieldsFilled(questionInput, answerOptionInputs) {
  // Check question input
  if (questionInput.value.trim() === '') {
    console.log("question not filled");
    displayRemark("Please fill in all required fields before proceeding.", 'red');
    return false;
  }
  // Check answer option inputs
  for (let input of answerOptionInputs) {
    if (input.value.trim() === '') {
      console.log("at least one answer not field");
      displayRemark("Please fill in all required fields before proceeding.", 'red');
      return false;
    }
  }
  console.log("all filled");
  return true;
}
function mostFieldsFilled(questionInput, answerOptionInputs) {
  // Check question input
  if (questionInput.value.trim() === '') {
    console.log("question not filled");
    displayRemark("Please fill in all required fields before proceeding.", 'red');
    return false;
  }

  // Count the number of filled answer option inputs
  let filledCount = 0;
  for (let input of answerOptionInputs) {
    if (input.value.trim() !== '') {
      filledCount++;
    }
  }

  // Check if at least two answer option fields are filled
  if (filledCount < 2) {
    console.log("less than two answers filled");
    displayRemark("Please fill in at least two answer options before proceeding.", 'red');
    return false;
  }

  console.log("all filled");
  return true;
}


function updateAddQuestionButton(addQuestionBtn, questionInput, answerOptionInputs) {
  addQuestionBtn.disabled = !areFieldsFilled(questionInput, answerOptionInputs);
}

function displayRemark(message, color = 'blue') {
  const remarkElement = document.getElementById('remark');
  remarkElement.textContent = message;
  remarkElement.style.color = color;

  setTimeout(function () {
    remarkElement.textContent = '';
  }, 5000);
}



/*
Form part
*/
//function to convert this array to json and create the form and generate qr code

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("validate-quiz-button").addEventListener("click", async () => {
    const img = document.getElementById('qr-code-image');
    const container = document.getElementById('qr-code-container');
    console.log("Button clicked!");
    const update = {
      requests: []
    };

    // conversion to json 
    quizData.forEach((questionItem, index) => {
      const correctOption = questionItem.options.find(option => option.isCorrect === true);
      console.log("****************************************************")
      console.log(correctOption.text);
      const createItemRequest = {
        createItem: {
          item: {
            title: `Question ${index + 1}`,
            description: questionItem.question,
            questionItem: {
              question: {
                required: true,
                grading: {
                  pointValue: 1,
                  correctAnswers: {
                    answers: [
                      {
                        value: correctOption.text
                      }
                    ]
                  }
                },
                choiceQuestion: {
                  type: "RADIO",
                  options: questionItem.options.map(option => ({ value: option.text }))
                },
              }
            }
          },
          location: {
            index: index
          }
        }
      };
      console.log("-----------------------------------------------")
      console.log(createItemRequest)
      update.requests.push(createItemRequest);
    });
    //form creation
    try {
      const response = await fetch('http://localhost:3000/api/create-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ update })
      });
      //get URL of the form if the response is valid
      if (response.ok) {
        const responseData = await response.json();
        console.log('Form created:', responseData);
        const formUrl = responseData.formUrl;
        formId = responseData.formId;
        console.log('Assigned formId:', formId);
        // Generate QR code based on the form URL
        code_url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(formUrl)}`;
        img.src = code_url;
        container.classList.add('active');
      } else {
        console.error('Failed to create form');
      }
    } catch (error) {
      console.error('Error creating form:', error);
    }
  });
});


// Get all checkboxes

/*
QR code part/ timer
*/



var interval;
var totalSeconds;
var remainingSeconds; // Added to store remaining time
var initialHours;
var initialMinutes;
var initialSeconds;
var timerDisplay = document.getElementById("countdown");
var seeResultsButton = document.getElementById("see-results");
var qrCodeContainer = document.getElementById("qr-code-container");
var timerContainer = document.getElementById("timer-container");
var inputGroup = document.getElementById("input-group");
var startBtn = document.getElementById("startBtn");
var pauseBtn = document.getElementById("pauseBtn");
var resumeBtn = document.getElementById("resumeBtn");
var resetBtn = document.getElementById("resetBtn");
var buttonsContainer = document.getElementById("buttons-container");


// function startTimer(initialRemainingSeconds) {
//   var hours = parseInt(document.getElementById("hours").value);
//   var minutes = parseInt(document.getElementById("minutes").value);
//   var seconds = parseInt(document.getElementById("seconds").value);

//   if (initialRemainingSeconds === undefined) { // If initialRemainingSeconds is not passed, calculate totalSeconds
//     totalSeconds = hours * 3600 + minutes * 60 + seconds;
//   } else { // If initialRemainingSeconds is passed, use it
//     totalSeconds = initialRemainingSeconds;
//   }

//   // Store total seconds in remaining seconds initially
//   remainingSeconds = totalSeconds;

//   // Hide setting of time and start button
//   inputGroup.style.display = "none";
//   startBtn.style.display= "none";
//   buttonsContainer.style.display= "flex";
//   timerDisplay.style.display = "block";
//   timerDisplay.style.fontSize = "25px"; // Display the QR code container
//   timerDisplay.style.fontWeight = "bold"; // Display the QR code container

//   // Start the countdown
//   interval = setInterval(function () {
//     var hoursLeft = Math.floor(remainingSeconds / 3600); // Use remainingSeconds here
//     var minutesLeft = Math.floor((remainingSeconds % 3600) / 60); // Use remainingSeconds here
//     var secondsLeft = remainingSeconds % 60; // Use remainingSeconds here

//     // Update the timer display with the countdown numbers
//     timerDisplay.textContent = `${hoursLeft.toString().padStart(2, '0')}:${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;

//     if (remainingSeconds <= 0) { // Use remainingSeconds here
//       clearInterval(interval);
//       timerDisplay.textContent = "Time's up!";
//       buttonsContainer.style.display = "none";
//       seeResultsButton.style.display = "block";
//     } else {
//       remainingSeconds--; // Decrease remainingSeconds instead of totalSeconds
//       qrCodeContainer.style.display = "block"; // Display the QR code container
//       generateQRCode('https://www.google.com'); // Generate QR code
//     }
//   }, 1000);
// }

function startTimer(initialRemainingSeconds) {
  var hours = parseInt(document.getElementById("hours").value);
  var minutes = parseInt(document.getElementById("minutes").value);
  var seconds = parseInt(document.getElementById("seconds").value);

  if (initialRemainingSeconds === undefined) {
    totalSeconds = hours * 3600 + minutes * 60 + seconds;
  } else {
    totalSeconds = initialRemainingSeconds;
  }

  remainingSeconds = totalSeconds;

  inputGroup.style.display = "none";
  startBtn.style.display = "none";
  buttonsContainer.style.display = "flex";
  timerDisplay.style.display = "block";
  timerDisplay.style.fontSize = "25px";
  timerDisplay.style.fontWeight = "bold";

  interval = setInterval(function () {
    var hoursLeft = Math.floor(remainingSeconds / 3600);
    var minutesLeft = Math.floor((remainingSeconds % 3600) / 60);
    var secondsLeft = remainingSeconds % 60;

    timerDisplay.textContent = `${hoursLeft.toString().padStart(2, '0')}:${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;

    if (remainingSeconds <= 0) {
      clearInterval(interval);
      timerDisplay.textContent = "Time's up!";
      buttonsContainer.style.display = "none";
      seeResultsButton.style.display = "block";

      // Trigger form closure
      closeForm(formId);
    } else {
      remainingSeconds--;
      qrCodeContainer.style.display = "block";
      generateQRCode('https://www.google.com');
    }
  }, 1000);
}


function closeForm(formId) {
  // Ensure formId is passed correctly
  if (!formId) {
    alert("Form ID is required to close the form.");
    return;
  }

  fetch('http://localhost:3000/api/close-form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ formId })
  })
    .then(response => {
      if (response.ok) {
        console.log('Form closed successfully');
      } else {
        console.error('Failed to close form');
        response.text().then(text => {
          console.error('Response:', text);
          alert("Failed to close form: " + text + formId);
        });
      }
    })
    .catch(error => {
      console.error('Error closing form:', error);
      alert('Error closing the form.');
    });

  // var form = FormApp.getActiveForm();
  // form.setAcceptingResponses(false);
  // deleteTriggers_();

}

function restartTimer() {
  clearInterval(interval);
  inputGroup.style.display = "flex"; // Display setting of time
  startBtn.style.display = "inline-block"; // Display start button
  buttonsContainer.style.display = "none";
  timerDisplay.style.display = "none";
  qrCodeContainer.style.display = "none";
}

function pauseTimer() {
  clearInterval(interval);
  pauseBtn.style.display = "none";
  resumeBtn.style.display = "inline-block";
}

function resumeTimer() {
  // Restart the timer with remaining time
  startTimer(remainingSeconds); // Pass remainingSeconds as an argument
  pauseBtn.style.display = "inline-block";
  resumeBtn.style.display = "none";
}

function resetTimer() {
  clearInterval(interval);
  startTimer(totalSeconds); // Pass remainingSeconds as an argument

}


function changeValue(id, direction) {
  var input = document.getElementById(id);
  var value = parseInt(input.value);
  if (direction === 'up') {
    input.value = (value + 1) % 60;
  } else if (direction === 'down') {
    input.value = (value - 1 + 60) % 60;
  }
}

/* Display */

var hero = document.getElementById("hero-section");
var about = document.getElementById("about");
var quizsection = document.getElementById("quiz_section");
var timer = document.getElementById("timer");
var statistics = document.getElementById("statistics");


var heroSelect = document.getElementById("hero-select");
var pdfSelect = document.getElementById("pdf-select");
var quizSelect = document.getElementById("quiz-select");
var timeSelect = document.getElementById("time-select");
var statsSelect = document.getElementById("stats-select");

var heroSpan = document.getElementById("hero-span");
var pdfSpan = document.getElementById("pdf-span");
var quizSpan = document.getElementById("quiz-span");
var timeSpan = document.getElementById("time-span");
var statsSpan = document.getElementById("stats-span");


function HeroDisplay(){
  hero.style.display = "block"; // Display start button
  about.style.display = "none"; // Display start button
  quizsection.style.display = "none"; // Display start button
  timer.style.display = "none"; // Display start button
  statistics.style.display = "none"; // Display start button

  // Set selected element styles
  heroSelect.style.backgroundColor = "#274C77";
  heroSelect.style.color = "#f2f3f5";
  heroSpan.style.color = "#f2f3f5";

  // Reset other elements styles
  pdfSelect.style.backgroundColor = "#f2f3f5";
  pdfSelect.style.color = "#274C77";
  pdfSpan.style.color = "#274C77";

  quizSelect.style.backgroundColor = "#f2f3f5";
  quizSelect.style.color = "#274C77";
  quizSpan.style.color = "#274C77";

  timeSelect.style.backgroundColor = "#f2f3f5";
  timeSelect.style.color = "#274C77";
  timeSpan.style.color = "#274C77";

  statsSelect.style.backgroundColor = "#f2f3f5";
  statsSelect.style.color = "#274C77";
  statsSpan.style.color = "#274C77";
}

function PdfDisplay(){
  hero.style.display = "none"; // Display start button
  about.style.display = "block"; // Display start button
  quizsection.style.display = "none"; // Display start button
  timer.style.display = "none"; // Display start button
  statistics.style.display = "none"; // Display start button

  // Set selected element styles
  pdfSelect.style.backgroundColor = "#274C77";
  pdfSelect.style.color = "#f2f3f5";
  pdfSpan.style.color = "#f2f3f5";
  
  // Reset other elements styles
  heroSelect.style.backgroundColor = "#f2f3f5";
  heroSelect.style.color = "#274C77";
  heroSpan.style.color = "#274C77";

  quizSelect.style.backgroundColor = "#f2f3f5";
  quizSelect.style.color = "#274C77";
  quizSpan.style.color = "#274C77";

  timeSelect.style.backgroundColor = "#f2f3f5";
  timeSelect.style.color = "#274C77";
  timeSpan.style.color = "#274C77";

  statsSelect.style.backgroundColor = "#f2f3f5";
  statsSelect.style.color = "#274C77";
  statsSpan.style.color = "#274C77";
}

function quizDisplay(){
  hero.style.display = "none"; // Display start button
  about.style.display = "none"; // Display start button
  quizsection.style.display = "block"; // Display start button
  timer.style.display = "none"; // Display start button
  statistics.style.display = "none"; // Display start button

  // Set selected element styles
  quizSelect.style.backgroundColor = "#274C77";
  quizSelect.style.color = "#f2f3f5";
  quizSpan.style.color = "#f2f3f5";
  
  // Reset other elements styles
  heroSelect.style.backgroundColor = "#f2f3f5";
  heroSelect.style.color = "#274C77";
  heroSpan.style.color = "#274C77";

  pdfSelect.style.backgroundColor = "#f2f3f5";
  pdfSelect.style.color = "#274C77";
  pdfSpan.style.color = "#274C77";

  timeSelect.style.backgroundColor = "#f2f3f5";
  timeSelect.style.color = "#274C77";
  timeSpan.style.color = "#274C77";

  statsSelect.style.backgroundColor = "#f2f3f5";
  statsSelect.style.color = "#274C77";
  statsSpan.style.color = "#274C77";
}

function timeDisplay(){
  hero.style.display = "none"; // Display start button
  about.style.display = "none"; // Display start button
  quizsection.style.display = "none"; // Display start button
  timer.style.display = "block"; // Display start button
  statistics.style.display = "none"; // Display start button

  // Set selected element styles
  timeSelect.style.backgroundColor = "#274C77";
  timeSelect.style.color = "#f2f3f5";
  timeSpan.style.color = "#f2f3f5";
  
  // Reset other elements styles
  heroSelect.style.backgroundColor = "#f2f3f5";
  heroSelect.style.color = "#274C77";
  heroSpan.style.color = "#274C77";

  pdfSelect.style.backgroundColor = "#f2f3f5";
  pdfSelect.style.color = "#274C77";
  pdfSpan.style.color = "#274C77";

  quizSelect.style.backgroundColor = "#f2f3f5";
  quizSelect.style.color = "#274C77";
  quizSpan.style.color = "#274C77";

  statsSelect.style.backgroundColor = "#f2f3f5";
  statsSelect.style.color = "#274C77";
  statsSpan.style.color = "#274C77";
}

function statsDisplay(){
  hero.style.display = "none"; // Display start button
  about.style.display = "none"; // Display start button
  quizsection.style.display = "none"; // Display start button
  timer.style.display = "none"; // Display start button
  statistics.style.display = "block"; // Display start button

  // Set selected element styles
  statsSelect.style.backgroundColor = "#274C77";
  statsSelect.style.color = "#f2f3f5";
  statsSpan.style.color = "#f2f3f5";
  
  // Reset other elements styles
  heroSelect.style.backgroundColor = "#f2f3f5";
  heroSelect.style.color = "#274C77";
  heroSpan.style.color = "#274C77";

  pdfSelect.style.backgroundColor = "#f2f3f5";
  pdfSelect.style.color = "#274C77";
  pdfSpan.style.color = "#274C77";

  quizSelect.style.backgroundColor = "#f2f3f5";
  quizSelect.style.color = "#274C77";
  quizSpan.style.color = "#274C77";
  
  timeSelect.style.backgroundColor = "#f2f3f5";
  timeSelect.style.color = "#274C77";
  timeSpan.style.color = "#274C77";
}

/*
stats part/ 
*/

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("see-results").addEventListener("click", async (event) => {
    // Prevent the default behavior of the click event
    event.preventDefault();
    try {
      
      console.log('Fetching responses for form ID:', formId);
      const response = await fetch('http://localhost:3000/api/get-responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ formId })
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Form responses:', responseData.responses);
        console.log('Form questions:', responseData.questions);


        // Render statistics and attendance
        renderStatsAndAttendance(responseData.responses,responseData.questions);
      } else {
        console.error('Failed to fetch responses');
      }
    } catch (error) {
      console.error('Error fetching responses:', error);
    }
    return false;
  });
});
function renderStatsAndAttendance(responses,questions) {
  // Calculate the number of responses
  const numberOfResponses = responses.length;
  console.log('Number of students who replied:', numberOfResponses);

  // Update the attendance section with the number of responses
  const attendanceTable = document.getElementById('attendance-table');
  attendanceTable.innerHTML = `<p>The number of responses for this quiz is: ${numberOfResponses}</p>`;

  // Show the statistics section
  document.getElementById('statistics').style.display = 'block';

  // Scroll to the attendance section
  document.getElementById('pills-attendance').scrollIntoView({ behavior: 'smooth' });

  // Process responses and render pie charts
  renderPieCharts(responses,questions);
}

function renderPieCharts(responses,questions) {
  // Aggregate answers by question ID
  const questionAggregates = {};

  responses.forEach(response => {
    Object.entries(response.answers).forEach(([questionId, answerData]) => {
      const answer = answerData.textAnswers.answers[0].value;

      if (!questionAggregates[questionId]) {
        questionAggregates[questionId] = {};
      }
      if (!questionAggregates[questionId][answer]) {
        questionAggregates[questionId][answer] = 0;
      }

      questionAggregates[questionId][answer]++;
    });
  });

  // Calculate percentages and render pie charts
  const graphsContainer = document.getElementById('pills-graphs');
  graphsContainer.innerHTML = ''; // Clear any existing content

  Object.entries(questionAggregates).forEach(([questionId, answers], index) => {
    const labels = Object.keys(answers);
    const data = Object.values(answers).map(count => (count / responses.length) * 100);

    const questionText = quizData[index].question;


    // Create a canvas element for the pie chart
    const canvas = document.createElement('canvas');
    graphsContainer.appendChild(canvas);

    // Render the pie chart
    new Chart(canvas, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'], // Customize colors as needed
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: `Question ${index+1}`
          }
        }
      }
    });
  });
}

