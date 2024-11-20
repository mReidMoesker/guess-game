'use strict';

const listen = (target, event, callback, ...options) => {
  return target.addEventListener(event, callback, ...options);
};

const select = (selector, scope = document) => {
  return scope.querySelector(selector);
};

function getNumber() {
  return Math.floor(Math.random() * 20) + 1; 
}

function resetGame() {
  randomNums = getNumber();
  guessCount = 0; 
  select('.number-guess').value = '';
  select('.guess-result').textContent = 'Make a guess to start the game';
  select('.guesses-made').textContent = `Guesses made: ${guessCount}`;
  toggleResetButton(false); 
}

function processGuess(guess) {
  const resultDisplay = select('.guess-result');

  if (isNaN(guess) || guess < 1 || guess > 20) {
    resultDisplay.textContent = 'Please enter a number between 1 and 20!';
    return;
  }

  if (guess === randomNums) {
    resultDisplay.textContent = '🎉🎉 You guessed correctly! 🎉🎉';
    toggleResetButton(true);
  } else if (guess < randomNums) {
    resultDisplay.textContent = 'My number is higher';
  } else {
    resultDisplay.textContent = 'My number is lower';
  }
}


function updateGuessCounter() {
  guessCount++; 
  select('.guesses-made').textContent = `Guesses made: ${guessCount}`;
}

function guessNumber() {
  const guessInput = select('.number-guess');
  const guess = parseInt(guessInput.value); 

  if (guessInput.value.trim() !== '') { 
    updateGuessCounter();
    processGuess(guess);
    guessInput.value = '';
  }
}

function toggleResetButton(show) {
  const resetButton = select('.reset-button');
  if (show) {
    resetButton.classList.remove('hidden');
  } else {
    resetButton.classList.add('hidden');
  }
}

let randomNums = getNumber();
let guessCount = 0;

select('.guesses-made').textContent = `Guesses made: ${guessCount}`;

listen(select('.guess-button'), 'click', guessNumber); 
listen(select('.reset-button'), 'click', resetGame); 