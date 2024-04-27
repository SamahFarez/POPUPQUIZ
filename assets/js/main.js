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

// Function to display a remark to the user
function displayRemark(message, color = 'blue') {
  const remarkElement = document.getElementById('remark');
  remarkElement.textContent = message;
  remarkElement.style.color = color;
}

// Example usage:


document.addEventListener('click', function (event) {
  const questionInput = document.querySelector('#questionInput');
  const answerOptionInputs = document.querySelectorAll('.answer-option');

  // Function to check if the fields are filled
  function areFieldsFilled() {
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

  // Function to enable/disable the "Add Question" button based on field status
  function updateAddQuestionButton() {
    addQuestionBtn.disabled = !areFieldsFilled();
  }

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
    } else if (buttonText === 'Add The Question') {

      const questionInput = document.querySelector('#questionInput');
      const answerOptionInputs = document.querySelectorAll('.answer-option');

      // Construct the new question structure
      const newQuestion = document.createElement('div');
      newQuestion.classList.add('quiz-question');
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
${Array.from(answerOptionInputs).map((input, index) => `<li><input type="checkbox" value="${String.fromCharCode(97 + index)}"> ${input.value}</li>`).join('')}
</ul>
`;

      // Append the new question to the quiz section
      const quizSection = document.querySelector('.quiz-questions');
      quizSection.appendChild(newQuestion);

      // Optionally, you can clear the input fields
      questionInput.value = '';
      answerOptionInputs.forEach(input => input.value = '');

      // Optionally, display a remark
      updateQuestionNumbering()
      displayRemark("New question added successfully!", 'green');

    }
  } else if (event.target.classList.contains('btn-secondary')) {
    if (buttonText === 'Add Answer Field') { // Checking if the button text is 'Add Answer Field'
      const quizEditingSection = document.querySelector('#quizEditingSection');

      if (areFieldsFilled()) {
        const answerOption = document.createElement('li');
        answerOption.innerHTML = `<input type='text' class='answer-option form-control mb-2' placeholder='Enter Answer Option'>`;
        const answerOptionsList = quizEditingSection.querySelector('.answer-options-div');
        answerOptionsList.appendChild(answerOption);

      }
    }
  }
});



function updateQuestionNumbering() {
  const quizQuestions = document.querySelectorAll('.quiz-question');
  quizQuestions.forEach((question, index) => {
    question.querySelector('.question-title').textContent = `Question ${index + 1}:`;
  });
}


const iconCont = document.querySelector('.quiz-questions');

iconCont.addEventListener('click', (event) => {
  if (event.target.tagName === 'BOX-ICON') { // Check if the clicked element is a box-icon
    const icon = event.target;
    const div = icon.closest('.quiz-question');

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

      span.classList.add('editted-field');
      // Replace input with span after editing
      input.replaceWith(span);

      icon.setAttribute('name', 'edit'); // Change icon back to 'edit'

    } else if (icon.getAttribute('name') === 'trash') {
      console.log("hello");
      div.remove();
      updateQuestionNumbering();
    }
  }
});

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
