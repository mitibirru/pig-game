'use strict';

// Selecting Elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, activePlayer, currentScore, playing;

const init = function () {
    scores = [0, 0];
    activePlayer = 0;
    currentScore = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0EL.classList.remove('player--winner');
    player1EL.classList.remove('player--winner');
    player0EL.classList.add('player--active');
    player1EL.classList.remove('player--active');
};
init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0EL.classList.toggle('player--active');
    player1EL.classList.toggle('player--active');
};

// Rolling dice Functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Generating a random dice roll.
        const dice = Math.floor(Math.random() * 6) + 1;

        // Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        // check for rolled 1: if true, switch to next player
        if (dice != 1) {
            // Add dice to current score
            currentScore += dice;
            document.getElementById(
                `current--${activePlayer}`
            ).textContent = currentScore;
        } else {
            // switch to next player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];

        // 2. check if player's score is >= 100
        // Finish the game
        if (scores[activePlayer] >= 100) {
            // Finish the game
            playing = false;
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
            btnRoll.classList.add('hidden');
            btnHold.classList.add('hidden');
            diceEl.classList.add('hidden');
        }

        // switch the player
        switchPlayer();
    }
});

btnNew.addEventListener('click', function () {
    init();
    btnRoll.classList.remove('hidden');
    btnHold.classList.remove('hidden');
});
