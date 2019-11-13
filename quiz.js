
  const myQuestions = [
    {
      question: "Fråga 1/5: Vilket år bildades Liljeholmen?",
      answers: {
        a: "1891",
        b: "1910",
        c: "1926",
        d: "1931"
      },
      correctAnswer: "c",
      center: {lat: 59.310212, lng: 18.022568},
      answered: false,
    },
    {
      question: "Fråga 2/5: Vilken av följande stadsdelar gränsar inte Liljeholmen mot?",
      answers: {
        a: "Årsta",
        b: "Midsommarkransen",
        c: "Gröndal",
        d: "Kungsholmen"
      },
      correctAnswer: "d",
      center: {lat: 59.310939, lng: 18.015303},
      answered: false,
    },
    {
      question: "Fråga 3/5: När öppnades Liljeholmens tunnelbanestation?",
      answers: {
        a: "1959",
        b: "1964",
        c: "1969",
        d: "1974"
      },
      correctAnswer: "b",
      center: {lat: 59.311014, lng: 18.009774},
      answered: false,
    },
    {
      question: "Fråga 4/5: Hur många personer bor det i Liljeholmen?",
      answers: {
        a: "5 000",
        b: "14 000",
        c: "29 000",
        d: "58 000"
      },
      correctAnswer: "b",
      center: {lat: 59.312334, lng: 18.010517},
      answered: false,
    },
    {
      question: "Fråga 5/5: 1839 grundades Liljeholmens Stearinfabrik. 1941 flyttade fabriken. Var?",
      answers: {
        a: "Danvikstull",
        b: "Luma",
        c: "Hornsberg",
        d: "Sundbyberg"
      },
      correctAnswer: "a",
      center: {lat: 59.313055, lng: 18.017680},
      answered: false,
    }
  ];

      // keep track of user's answers
      var numCorrect = 0;

  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
      
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");

  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} rätt av ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    
    /*
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    */
    
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }  

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  //Button for splash
  const submitSplash = document.getElementById("submitQuizButton");

  // Create quiz
  buildQuiz();

  //const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  

  // on submit, show results
  submitButton.addEventListener("click", showResults);
  //previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide); 

  nextButton.addEventListener('click', function() { document.getElementById("quizdiv").style.display="none" });
  submitButton.addEventListener("click", function() { document.getElementById("quiz").style.display="none" });
  submitButton.addEventListener("click", function() { document.getElementById("submit").style.display="none" });


  submitSplash.addEventListener("click", function() { document.getElementById("splash").style.display="none"})