let arr = [1, 2, 3]
console.log(arr[1])


'use strict';

//// selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.getElementById("current--0")
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new")
const btnRoll = document.querySelector(".btn--roll")
const btnHold = document.querySelector(".btn--hold")


// console.log(score0)
// console.log(score1)
// starting conditons
let scores, currentScore, activePlayer, playing

const init = function () {
    scores = [0, 0]
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    player0El.classList.remove("player--winner")
    player1El.classList.remove("player--winner")
    player0El.classList.add("player--active")
    player1El.classList.remove("player--active")

    // hide the dice initially so for that we added .hidden in css but not in html
    diceEl.classList.add("hidden")


}

init()




const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active")
    player1El.classList.toggle("player--active")
    currentScore = 0
}

btnRoll.addEventListener("click", function () {
    if (playing) {

        //// we roll dice which will generate random number btween 1 to 6
        const dice = Math.trunc(Math.random() * 6) + 1
        // console.log("dice", dice)

        //// initally we have hiddent the image of dice so now when dice is rolled we will display 
        //// the respective image 
        diceEl.classList.remove("hidden")
        diceEl.src = `dice-${dice}.png`


        //// if rolled dice is not one the keep adding the numbers to current score
        //// if dice === 1 then switch to next player
        if (dice !== 1) {
            currentScore += dice
            document.getElementById(`current--${activePlayer}`).textContent = currentScore
            // current0El.textContent = currentScore
            // console.log(currentScore)
        } else {
            //// switch to next player
            switchPlayer()
        }
    }
})

btnHold.addEventListener("click", function () {
    if (playing) {
        // console.log("Hold")
        //// first add current score to total score
        scores[activePlayer] += currentScore
        // scores[1] = scores[1] + currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]


        /// if players score is >=100 player wins
        if (scores[activePlayer] >= 100) {
            diceEl.classList.add("hidden")
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner")
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active")

        } else {
            //// switch to next player
            switchPlayer()
        }
    }

})

btnNew.addEventListener("click", init)




