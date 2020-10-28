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
let viewWinners = document.getElementById("toggleWinners");
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
    restartGame();
}


//play the game
function vote() {
    //get joke to start game
    game();

    // loop to select different jokes
    for (let i = 0; i < numRounds; i++) {
        vote1.onclick = function () {
            //store winning and losing joke in appropriate array in session storage
            sessionStorage.setItem("winner", gameState.winners.push(joke1.textContent));
            sessionStorage.setItem("loser", gameState.losers.push(joke2.textContent));
            //cut losing joke then skip one joke in array then display next joke
            gameState.allJokes.splice(1, 1);
            //set text content to joke 
            joke2.textContent = gameState.allJokes[1];
            //increment count for later comparison
            count++;
            //initiate gameOver function
            gameOver();
        }
        vote2.onclick = function () {
            //store winning and losing joke in appropriate array in session storage
            sessionStorage.setItem("winner", gameState.winners.push(joke2.textContent));
            sessionStorage.setItem("loser", gameState.losers.push(joke1.textContent));
            //cut losing joke then skip one joke in array then display next joke
            gameState.allJokes.splice(0, 1);
            //set text content to joke
            joke1.textContent = gameState.allJokes[1];
            //increment count for later comparison
            count++;
            //initiate gameOver function
            gameOver();           
        }
    } 
}

//displays gameover in game cards and voting buttons once count = 5
function gameOver() {
    if (count >= numRounds) {
        joke2.textContent = "GAME OVER..... CLICK RESTART BUTTON TO PLAY AGAIN";
        joke1.textContent = "GAME OVER..... CLICK RESTART BUTTON TO PLAY AGAIN";

        if (vote1.innerHTML === "Vote") {
            vote1.innerHTML = "GAME OVER";
            vote2.innerHTML = "GAME OVER";
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
        if (viewWinners.style.display === "none") {
            viewWinners.style.display = "block";

        } else {
            viewWinners.style.display = "none";
        }

        if (winBtn.value === "View Winners") {
            winBtn.value = "Close Winners";
        }
        else {
            winBtn.value = "View Winners";
        }
    }
}

//restart game logic
function restartGame() {
    //hide winning cards once restart is pressed
    if (viewWinners.style.display === "block") {
        viewWinners.style.display = "none";
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

//run game
vote();
//show winning jokes
showWinner();














