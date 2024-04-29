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
Quiz Part
*/

// Sample data structure containing quiz questions
var quizData = [
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
  },
];
// Function to generate quiz HTML from data
function generateQuizHTML() {
  var quizDisplaySection = document.getElementById("quizDisplaySection");

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
  generateQuizHTML();
  handleAddQuestionButton()
  attachCheckboxListeners(); // Attach checkbox event listeners
  handleIconClicks();
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

  setTimeout(function() {
    remarkElement.textContent = '';
  }, 5000); 
}






// Get all checkboxes

/*
QR code part/ timer
*/


function startTimer() {
  var minutes = parseInt(document.getElementById("minutes").value);
  var seconds = minutes * 60;
  var timerDisplay = document.getElementById("countdown");
  var seeResultsButton = document.getElementById("see-results");
  var qrCodeContainer = document.getElementById("qr-code-container");
  var timerContainer = document.getElementById("timer-container");

  // Hide setting of time and start button
  timerContainer.style.display = "none";

  // Clear any existing countdown numbers
  timerDisplay.innerHTML = '';

  // Start the countdown
  var countdown = setInterval(function () {
    var minutesLeft = Math.floor(seconds / 60);
    var secondsLeft = seconds % 60;

    // Update the timer display with the countdown numbers
    timerDisplay.innerHTML = `<span class="countdown-number">${minutesLeft.toString().padStart(2, '0')}</span>:<span class="countdown-number">${secondsLeft.toString().padStart(2, '0')}</span>`;
    seeResultsButton.style.textAlign = "center";

    if (seconds <= 0) {
      clearInterval(countdown);
      timerDisplay.textContent = "Time's up!";
      seeResultsButton.style.display = "block";

    } else {
      seconds--;
      qrCodeContainer.style.display = "block"; // Display the QR code container
    }
  }, 1000);
}

function incrementMinutes() {
  var minutesInput = document.getElementById("minutes");
  var currentMinutes = parseInt(minutesInput.value);
  minutesInput.value = currentMinutes + 1;
}

function decrementMinutes() {
  var minutesInput = document.getElementById("minutes");
  var currentMinutes = parseInt(minutesInput.value);
  if (currentMinutes > 1) {
    minutesInput.value = currentMinutes - 1;
  }
}

document.getElementById("see-results").addEventListener("click", function () {
  // Scroll to the "results" section
  document.getElementById("results").scrollIntoView({ behavior: "smooth" });
});
