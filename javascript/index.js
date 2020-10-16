const gameState = {
    allJokes: [],
    losers: [],
    winners: []

}
//get chucknorris joke


const fetchChuck = async () => {
    for (let i = 0; i < 3; i++) {
        await fetch('https://api.chucknorris.io/jokes/random').then((r) => {
            return r.json().then((data) => {
                gameState.allJokes.push(data.value);
                return data;
            })
        })
    }

}
//fetchChuck();
//console.log(gameState.allJokes);

const joke1 = document.querySelector('#joke-one');
const joke2 = document.querySelector('#joke-two');

const game = async () => {

    for (let i = 0; i < 2; i++) {

        await fetchChuck();


    }
    joke1.innerText = gameState.allJokes[0];
    joke2.innerText = gameState.allJokes[1];


}



let rst = document.getElementById('rst');
rst.onclick = function () {
    gameState.allJokes = [];
    gameState.winners = [];
    gameState.losers = [];
    fetchChuck();
    game();
}



function vote() {
    game();

    let vote1 = document.getElementById('vote1');
    let vote2 = document.getElementById('vote2');

    for (let i = 0; i < 10; i++) {
        vote1.onclick = function () {

            gameState.winners.push(joke1.textContent);
            gameState.losers.push(joke2.textContent);
            gameState.allJokes.splice(1, 1);
            joke2.textContent = gameState.allJokes[1];

        }

        vote2.onclick = function () {
            gameState.winners.push(joke2.textContent);
            gameState.losers.push(joke1.textContent);
            gameState.allJokes.splice(0, 1);
            
            joke1.textContent = gameState.allJokes[1];


        }





    }



}







vote();



// set an onclick function to store the winning selection into an array and to select another random movie for the opponent

// set an onclick funstion to skip the movies and display two new movies 
//set an onlcick function to restart the game by reinitializing the arrays to empty arrays. 
//set a function to display the winners in order as well as the losers in a table format. 