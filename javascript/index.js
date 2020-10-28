//object to store array data for use in game
const gameState = {
    allJokes: [],
    losers: [],
    winners: [],
    winnerId: ['win1', 'win2', 'win3', 'win4', 'win5']
}
//global variables
const joke1 = document.querySelector('#joke-one');
const joke2 = document.querySelector('#joke-two');
let rst = document.getElementById('rst');
var x = document.getElementById("toggleWinners");
let winBtn = document.querySelector('#viewWinners');
let vote1 = document.getElementById('vote1');
let vote2 = document.getElementById('vote2');
let numRounds = 5;
let count = 0;


//get chucknorris joke
const fetchChuck = async () => {
    for (let i = 0; i < 6; i++) {
        await fetch('https://api.chucknorris.io/jokes/random').then((r) => {
            return r.json().then((data) => {
                gameState.allJokes.push(data.value);
                return data;
            })
        })
    }
}



//initiate joke in game cards
const game = async () => {
    await fetchChuck();

//set jokes to game cards
    joke1.innerText = gameState.allJokes[0];
    joke2.innerText = gameState.allJokes[1];
}




//reset game to start over
rst.onclick = function () {
//hide winning cards once restart is pressed
    if (toggleWinners.style.display === "block") {
        toggleWinners.style.display = "none";
    }

//reset all game arrays to empty 
    gameState.allJokes = [];
    gameState.winners = [];
    gameState.losers = [];

//change view winner button text if restart is initiated while winners cards are open
    if (winBtn.value === "Close Winners") {
        winBtn.value = "View Winners";
    }
    
//reset button and game card text for new game
    if (gameOver) {
        vote1.innerHTML = "Vote";
        vote2.innerHTML = "Vote";
    }

//reset count to zero
    count = 0;

//get new jokes
    game();
}


//play the game
function vote() {
//get joke to start game
    game();

// set an onclick function to store the winning selection into an array and to select another random joke for the opponent
    for (let i = 0; i < numRounds; i++) {
        vote1.onclick = function () {
            sessionStorage.setItem("winner", gameState.winners.push(joke1.textContent));
            sessionStorage.setItem("loser", gameState.losers.push(joke2.textContent));
            gameState.allJokes.splice(1, 1);
            joke2.textContent = gameState.allJokes[1];
            count++;
            gameOver();
        }
        vote2.onclick = function () {
            sessionStorage.setItem("winner", gameState.winners.push(joke2.textContent));
            sessionStorage.setItem("loser", gameState.losers.push(joke1.textContent));
            gameState.allJokes.splice(0, 1);
            joke1.textContent = gameState.allJokes[1];
            count++;
            gameOver();
        }
    }
}

//displays gameover in game cards and voting buttons once count = 5
function gameOver() {
    if (count >= numRounds) {
        joke2.textContent = "Game Over";
        joke1.textContent = "Game Over";
        if (vote1.innerHTML === "Vote") {
            vote1.innerHTML = "Game Over";
            vote2.innerHTML = "Game Over";
        }
    }
}

//display the winning jokes in seperate cards
function showWinner() {
    winBtn.onclick = function () {
        for (let i = 0; i < numRounds; i++) {
            let winJoke = document.getElementById(gameState.winnerId[i]);
            winJoke.textContent = gameState.winners[i];
        }
        if (x.style.display === "none") {
            x.style.display = "block";

        } else {
            x.style.display = "none";
        }

        if (winBtn.value === "View Winners") {
            winBtn.value = "Close Winners";
        }
        else {
            winBtn.value = "View Winners";
        }
    }
}


vote();
showWinner();














// set an onclick funstion to skip the movies and display two new movies 
//set an onlcick function to restart the game by reinitializing the arrays to empty arrays. 
//set a function to display the winners in order as well as the losers in a table format. 