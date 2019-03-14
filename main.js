
//array that tracks all squares in X O hashtag
var tictactoe;

// players value
const player1 = 'X';
const player2 = 'O';

// turn variable that saves whosTurn in each click
var WhosTurn = 1;
// displays whosTurn
$(".turnName").text("It's  "+player1+"'s  Turn");
// Array of all win cases
const winCase = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
// Welcome  Sweet Alert 
swal("Welcome to Tic Tac Toe", " press ok button if you are ready to play!!");
// gets all the tds on HTML table 
const squares = document.querySelectorAll('.square');
// calls the play function to start the game
play();
// function that resets all squares in the game 
function play() {
// it fills the squares array with numbers from 0-8
    tictactoe = Array.from(Array(9).keys());
// it resets the content, style, recreate event listner  of all squares 
    for (var i = 0; i < squares.length; i++) {
        squares[i].innerText = '';
        squares[i].style.removeProperty('background-color');
        squares[i].addEventListener('click', turnClick, false);
    }
}
// function that change the players turn based on mouse click using if statement 
function turnClick(hashtag) {
    if (WhosTurn == 1) {
// calls the turn function and pass the clicked td id & player1 value
        turn(hashtag.target.id, player1);
// it displays whos turn on page
        $(".turnName").text("It's  " +player2+"'s  Turn");
        WhosTurn = 2;
    }
    else if (WhosTurn == 2) {
// calls the turn function and pass the clicked td id & player2 value
        turn(hashtag.target.id, player2);
// it displays whos turn on page
        $(".turnName").text("It's  " +player1+"'s  Turn");
        WhosTurn = 1;
    }
}
// function turn that add each player value to the X O hashtag
function turn(hashtagId, player) {
    if (typeof (tictactoe[hashtagId]) == "number") {
        tictactoe[hashtagId] = player;
        document.getElementById(hashtagId).innerText = player;
    }
//  it checks if there is any win 
    let gameWon = checkWin(tictactoe, player)
    if (gameWon) {
        if (gameWon.player == 'No Winner') {
            console.log(gameWon.player)
            catGame();
        }
// sweet alert that gives the win message
        else {
            swal({
                title: "Smart move!",
                text: "You nailed it!!",
                icon: "success",
                button: "Play again..",
// then it resets here since we called the play() function
            }).then((e => {
                if (e) {
                    play();
                } else {
                }
            }));
        }
        gameOver(gameWon);
    }
}
// function that checks the tie every step
function catGame() {
    swal({
        title: "Cat Game!",
        text: "Opsss! No one wins!!",
        button: "Play again..",
// it resets the game when play again clicked
    }).then((e => {
        play();
    }));
}
// function that checks the win cases every step
function checkWin(tictac, player) {
    let plays = tictac.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []);
    let gameWon = null;
    for (let [index, win] of winCase.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = { index: index, player: player };
            break;
        }
    }
// it checks if the Tic Tac Toe hashtag is full or not yet
    if ((tictactoe.filter(i => typeof i == "number").length == 0)) {
        return { index: -1, player: 'No Winner' };
    }
    return gameWon;
}
// function that change the background style when someone wins
function gameOver(gameWon) {
    for (let index of winCase[gameWon.index]) {
        document.getElementById(index).style.backgroundColor =
            gameWon.player == player1 ? "rgba(57, 201, 177, 0.8)" : "rgba(57, 201, 177, 0.8)";
    }
    for (var i = 0; i < squares.length; i++) {
        squares[i].removeEventListener('click', turnClick, false);
    }
}
