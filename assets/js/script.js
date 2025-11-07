// Timed Quiz - Core Implementation
(function(){
  'use strict';

  let questions = [
    { q: 'What does DOM stand for?', choices: ['Data Object Map','Document Object Model','Document Oriented Markup'], answer: 1 },
    { q: 'Strict equality operator?', choices: ['==','===','!='], answer: 1 },
    { q: 'Method to select one element?', choices: ['getElementsByClassName','querySelectorAll','querySelector'], answer: 2 },
    { q: 'Add an event listener?', choices: ['onClick','addEventListener','attachEvent'], answer: 1 },
    { q: 'LocalStorage stores…', choices: ['Only objects','Only numbers','Strings'], answer: 2 },
    { q: 'Stop an interval?', choices: ['cancelInterval','clearInterval','stopInterval'], answer: 1 },
    { q: 'Array last index?', choices: ['length','length-1','length+1'], answer: 1 },
    { q: 'Prevent form default?', choices: ['event.preventDefault()','event.stop()','event.block()'], answer: 0 },
    { q: 'Create element?', choices: ['document.makeElement','document.createElement','new HTMLElement()'], answer: 1 },
    { q: 'Get attribute?', choices: ['el.attr()','el.getAttribute()','el.attribute()'], answer: 1 }
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 60;
  let timerId = null;

  let app = document.getElementById('app');

  function startTimer() {
    timerId = setInterval(function() {
      timeLeft--;
      render();
      
      if (timeLeft <= 0) {
        endQuiz();
      }
    }, 1000);
  }

  function displayQuestion() {
    // Clear previous content
    app.innerHTML = '';

    // Show timer and score
    let info = document.createElement('div');
    info.textContent = 'Time: ' + timeLeft + 's | Score: ' + score + '/' + questions.length + ' | Question ' + (currentQuestionIndex + 1) + '/' + questions.length;
    app.appendChild(info);

    let question = questions[currentQuestionIndex];
    
    // Show question
    let questionEl = document.createElement('h2');
    questionEl.textContent = question.q;
    app.appendChild(questionEl);

    // Create answer buttons
    for (let i = 0; i < question.choices.length; i++) {
      let button = document.createElement('button');
      button.textContent = question.choices[i];
      button.className = 'answer-btn';
      
      // With let, we don't need the closure pattern anymore!
      button.addEventListener('click', function() {
        selectAnswer(i);
      });
      
      app.appendChild(button);
    }
  }

  function selectAnswer(selectedIndex) {
    let question = questions[currentQuestionIndex];
    
    // Check if answer is correct
    if (selectedIndex === question.answer) {
      score++;
    }

    // Move to next question
    currentQuestionIndex++;
    
    // Check if quiz should end
    if (currentQuestionIndex >= questions.length) {
      endQuiz();
    } else {
      render();
    }
  }

  function endQuiz() {
    // Stop timer
    if (timerId) {
      clearInterval(timerId);
    }

    // Clear content and show results
    app.innerHTML = '';
    
    let resultsTitle = document.createElement('h2');
    resultsTitle.textContent = 'Quiz Complete!';
    app.appendChild(resultsTitle);
    
    let finalScore = document.createElement('p');
    finalScore.textContent = 'Final Score: ' + score + ' out of ' + questions.length;
    app.appendChild(finalScore);
    
    let timeInfo = document.createElement('p');
    if (timeLeft > 0) {
      timeInfo.textContent = 'Time remaining: ' + timeLeft + ' seconds';
    } else {
      timeInfo.textContent = 'Time expired!';
    }
    app.appendChild(timeInfo);
  }

  function render() {
    // Check if quiz should end
    if (currentQuestionIndex >= questions.length || timeLeft <= 0) {
      endQuiz();
      return;
    }
    
    // Display current question
    displayQuestion();
  }

  // Initialize the quiz
  function init() {
    if (!app) {
      console.error('Could not find app element');
      return;
    }
    
    startTimer();
    render();
  }

  // Start the quiz
  init();

})();