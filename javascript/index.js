const gameState = {
    allJokes: [],
    losers: [],
    winners: [],
    winnerId: ['win1', 'win2', 'win3', 'win4', 'win5']
}
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


const joke1 = document.querySelector('#joke-one');
const joke2 = document.querySelector('#joke-two');

const game = async () => {

    for (let i = 0; i < 1; i++) {
        await fetchChuck();
    }
    joke1.innerText = gameState.allJokes[0];
    joke2.innerText = gameState.allJokes[1];
}



let rst = document.getElementById('rst');
var x = document.getElementById("toggleWinners");
rst.onclick = function () {
    if (toggleWinners.style.display === "block") {
        toggleWinners.style.display = "none";
    } 
    gameState.allJokes = [];
    gameState.winners = [];
    gameState.losers = [];
    
    game();
}



function vote() {
    game();

    let vote1 = document.getElementById('vote1');
    let vote2 = document.getElementById('vote2');

    // set an onclick function to store the winning selection into an array and to select another random movie for the opponent
    for (let i = 0; i < 5; i++) {


        vote1.onclick = function () {

            sessionStorage.setItem("winner", gameState.winners.push(joke1.textContent));
            sessionStorage.setItem("loser", gameState.losers.push(joke2.textContent));
            gameState.allJokes.splice(1, 1);
            joke2.textContent = gameState.allJokes[1];

        }

        vote2.onclick = function () {
            sessionStorage.setItem("winner", gameState.winners.push(joke2.textContent));
            sessionStorage.setItem("loser", gameState.losers.push(joke1.textContent));
            gameState.allJokes.splice(0, 1);
            joke1.textContent = gameState.allJokes[1];
        }



    }

}

function showWinner() {
    let winBtn = document.querySelector('#viewWinners');
    

    winBtn.onclick = function () {

        for (let i = 0; i < 5; i++) {
            let winJoke = document.getElementById(gameState.winnerId[i]);
            winJoke.innerHTML = gameState.winners[i];
        }
        //console.log(winJoke);


        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }

    }
}


vote();
showWinner();














// set an onclick funstion to skip the movies and display two new movies 
//set an onlcick function to restart the game by reinitializing the arrays to empty arrays. 
//set a function to display the winners in order as well as the losers in a table format. 