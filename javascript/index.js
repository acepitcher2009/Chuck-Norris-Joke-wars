const gameState = {
    allJokes: [],
    losers: [],
    winners: [],
    winnerId: ['win1', 'win2', 'win3', 'win4', 'win5']
}
//variables used
const joke1 = document.querySelector('#joke-one');
const joke2 = document.querySelector('#joke-two');
let rst = document.getElementById('rst');
var x = document.getElementById("toggleWinners");
let winBtn = document.querySelector('#viewWinners');
let vote1 = document.getElementById('vote1');
let vote2 = document.getElementById('vote2');
let gameDiv = document.getElementById("gameDiv");
let endGame = "Game Over";
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




const game = async () => {


    await fetchChuck();

    joke1.innerText = gameState.allJokes[0];
    joke2.innerText = gameState.allJokes[1];
}





rst.onclick = function () {
    if (toggleWinners.style.display === "block") {
        toggleWinners.style.display = "none";
    }
    gameState.allJokes = [];
    gameState.winners = [];
    gameState.losers = [];
    if (winBtn.value === "View Winners") {
        winBtn.value = "Close Winners";
    }
    else {
        winBtn.value = "View Winners";
    }
    count = 0;
    game();
}



function vote() {
    game();



    // set an onclick function to store the winning selection into an array and to select another random movie for the opponent
    for (let i = 0; i < numRounds; i++) {
        vote1.onclick = function () {
            count++;
            sessionStorage.setItem("winner", gameState.winners.push(joke1.textContent));
            sessionStorage.setItem("loser", gameState.losers.push(joke2.textContent));
            gameState.allJokes.splice(1, 1);
            joke2.textContent = gameState.allJokes[1];
        }
        vote2.onclick = function () {
            count++
            sessionStorage.setItem("winner", gameState.winners.push(joke2.textContent));
            sessionStorage.setItem("loser", gameState.losers.push(joke1.textContent));
            gameState.allJokes.splice(0, 1);
            joke1.textContent = gameState.allJokes[1];
        }
    }
    
    
}



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