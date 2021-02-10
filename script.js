'use strict';

// Start by selecting the elements

const newBtn  = document.querySelector(".btn--new");
const holdBtn = document.querySelector(".btn--hold");
const rollBtn = document.querySelector(".btn--roll");
const diceEl = document.querySelector(".dice");
const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");


// set all values to zero
score0.textContent = 0;
score1.textContent = 0;
diceEl.classList.add("hidden");

// Variables created

let currentScore = 0;
let totalScore = [0,0];
// This is created to display who is playing
let activePlayer = 0;

// Create a state variable

let playing = true;

// create an initialization function

function init()
{
    // reset all values to zero
    totalScore = [0,0];
    currentScore = 0;

    // update the score board
    diceEl.classList.add("hidden");
    score0.textContent = currentScore;
    score1.textContent = currentScore;
    current0.textContent = currentScore;
    current1.textContent = currentScore;
    player0.classList.remove("player--winner");
    player1.classList.remove("player--winner");
    player0.classList.add("player--active");
    player1.classList.remove("player--active");
    
      // set active player to 1
      
      activePlayer = 0;

  
     // set the playing value to be true
     playing = true;
  
}

init();

function switchPlayer()
{
      // make the current score equal to 0 
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
      // Switch player 
      // let active player instead of 0 to 1 and vice versa
      activePlayer = (activePlayer === 0) ? 1 : 0;
      // Toggle the player active class
      player0.classList.toggle("player--active");
      player1.classList.toggle("player--active");
}

// Start with the roll button logic 
rollBtn.addEventListener("click",function()
{
    if(playing){
    // 1- Generate a random dice number 
    const randomDice = Math.floor(Math.random()*6) +1;
    // 2- Get the corresponding image to the dice picture
    diceEl.src = `dice-${randomDice}.png`;
    diceEl.classList.remove("hidden");

    // check if it is a 1 or not 
    if(randomDice !== 1)
    {
        // Add to current score
        currentScore+=randomDice;
        // Display current score
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }
    else
    {
       
        switchPlayer();
    }
    }
})

// Hold button logic

holdBtn.addEventListener("click",function()
{
    if(playing){
    // add current score to total score 
    totalScore[activePlayer] += currentScore;
    // display the total score 
    document.getElementById(`score--${activePlayer}`).textContent = totalScore[activePlayer];
    // Check if the score is greater than 100
    if(totalScore[activePlayer] >=10)
    {
        playing = false;
    
        document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
    }
    else
    {
       // Switch the player
       
       switchPlayer();

    }
}
   
})

// New game button logic

newBtn.addEventListener("click",init);

