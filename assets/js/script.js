// Timed Quiz - Core Implementation
(function(){
  'use strict';

  // Quiz Data
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

  // Game State
  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 60;
  let timerId = null;

  // DOM Elements
  let app = document.getElementById('app');
  let msgDiv = document.getElementById('msg');

  // Display message (following 01-Activities pattern)
  function displayMessage(type, message) {
    msgDiv.textContent = message;
    msgDiv.className = type;
  }

  // Start timer
  function startTimer() {
    timerId = setInterval(function() {
      timeLeft--;
      if (timeLeft <= 0) {
        endQuiz();
      } else {
        render();
      }
    }, 1000);
  }

  // Render current state
  function render() {
    if (currentQuestionIndex >= questions.length) {
      endQuiz();
      return;
    }

    app.innerHTML = '';
    
    // Info bar
    let info = document.createElement('div');
    info.textContent = 'Time: ' + timeLeft + 's | Score: ' + score + '/' + questions.length + ' | Question ' + (currentQuestionIndex + 1) + '/' + questions.length;
    app.appendChild(info);

    let question = questions[currentQuestionIndex];
    
    // Question
    let questionEl = document.createElement('h2');
    questionEl.textContent = question.q;
    app.appendChild(questionEl);

    // Answer buttons
    for (let i = 0; i < question.choices.length; i++) {
      let button = document.createElement('button');
      button.textContent = question.choices[i];
      button.className = 'answer-btn';
      button.addEventListener('click', function() {
        selectAnswer(i);
      });
      app.appendChild(button);
    }
  }

  // Handle answer selection
  function selectAnswer(selectedIndex) {
    let question = questions[currentQuestionIndex];
    
    if (selectedIndex === question.answer) {
      score++;
    }

    currentQuestionIndex++;
    render();
  }

  // End quiz and show results
  function endQuiz() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }

    app.innerHTML = '';
    
    // Results
    let title = document.createElement('h2');
    title.textContent = timeLeft <= 0 ? '⏰ Time\'s Up!' : '🎉 Quiz Complete!';
    app.appendChild(title);
    
    let scoreText = document.createElement('p');
    scoreText.textContent = 'Final Score: ' + score + ' out of ' + questions.length;
    app.appendChild(scoreText);
    
    let percentage = Math.round((score / questions.length) * 100);
    let percentageText = document.createElement('p');
    percentageText.textContent = 'Percentage: ' + percentage + '%';
    app.appendChild(percentageText);
    
    // Restart button
    let restartBtn = document.createElement('button');
    restartBtn.textContent = 'Take Quiz Again';
    restartBtn.className = 'answer-btn';
    restartBtn.addEventListener('click', function() {
      currentQuestionIndex = 0;
      score = 0;
      timeLeft = 60;
      displayMessage('', '');
      startTimer();
      render();
    });
    app.appendChild(restartBtn);
    
    // Show message
    let messageType = percentage >= 70 ? 'success' : 'error';
    let messageText = percentage >= 70 ? 'Great job! You passed!' : 'Try again to improve your score.';
    displayMessage(messageType, messageText);
  }

  // Initialize
  function init() {
    if (!app || !msgDiv) {
      console.error('Missing required elements');
      return;
    }
    
    startTimer();
    render();
  }

  init();

})();