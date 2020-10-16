const gameState = {
    allJokes: [],
    losers: [],
    winners: []

}
//get chucknorris joke


const fetchChuck = async () => {
    for (let i = 0; i < 6; i++){
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


const myGame = async () => {
    
    
    const joke1 = document.querySelector('#joke-one');
    const joke2 = document.querySelector('#joke-two')

    for (let i = 0; i < 6; i++) {
        
        await fetchChuck();
    
    
    }
    joke1.innerText = gameState.allJokes[0];
    joke2.innerText = gameState.allJokes[1];
}

myGame();

//set the images to appear in random order
//set the buttons below the image to display the title of the image
// set an onclick function to store the winning selection into an array and to select another random movie for the opponent
// set an onclick funstion to skip the movies and display two new movies 
//set an onlcick function to restart the game by reinitializing the arrays to empty arrays. 
//set a function to display the winners in order as well as the losers in a table format. 