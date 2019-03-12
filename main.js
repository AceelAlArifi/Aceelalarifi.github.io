
var tictactoe;
const player1 = 'X';
const player2 = 'O';
var WhosTurn = 1;
$(".turnName").text(player1);

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
swal("Welcome to Tic Tac Toe", " press ok button if you are ready to play!!");

const squares = document.querySelectorAll('.square');
play();

function play() {
    document.querySelector(".finish").style.display = "none";
    tictactoe = Array.from(Array(9).keys());
    for (var i = 0; i < squares.length; i++) {
        squares[i].innerText = '';
        squares[i].style.removeProperty('background-color');
        squares[i].addEventListener('click', turnClick, false);
    }
    $('.text').text("")

}

// console.log(player1);
// function turnClick(square) {
//    console.log(square.target.id)
// }

function turnClick(hashtag) {
  //  var player1 = 'X'; 
    console.log(hashtag.target);
    console.log(hashtag.target.id);
    if (WhosTurn ==1){
        turn(hashtag.target.id, player1);
        $(".turnName").text(player2);
        WhosTurn=2;
        
    }
    else if (WhosTurn == 2 ){
        turn(hashtag.target.id, player2);
        $(".turnName").text(player1);
        
                        //change p tag ro display "now it's player2 turn"

        WhosTurn = 1;

   }

}

function turn(hashtagId, player) {
    // console.log(tictactoe[hashtagId])
    // console.log(document.getElementById(hashtagId).innerText)
    if (typeof (tictactoe[hashtagId])=="number"){
        tictactoe[hashtagId] = player;
        document.getElementById(hashtagId).innerText = player;
}
   let gameWon = checkWin(tictactoe, player)
    if (gameWon) {
        if (gameWon.player == 'No Winner') {
            console.log(gameWon.player)
            catGame();
        }
        else  {
            swal({
                title: "Smart move!",
                text: "You nailed it!!",
                icon: "success",
                button: "Play again..",

            }).then((e=>{
                
                    if (e) {
                        play();
                    } else {
                    }
                }));
            }

            gameOver(gameWon);
        }
    

}

function catGame() {
    swal({
        title: "Cat Game!",
        text: "No one wins!!",
        button: "Play again..",

    }).then((e => {

        if (e) {
            play();
        } else {
        }
    }));
}

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
    if ((tictactoe.filter(i => typeof i == "number").length==0)){
        return { index: -1, player:'No Winner'}; 
     }
    return gameWon;
}

function gameOver(gameWon) {
    for (let index of winCase[gameWon.index]) {
        document.getElementById(index).style.backgroundColor =
            gameWon.player == player1 ? "rgba(57, 201, 177, 0.8)" : "rgba(57, 201, 177, 0.8)";
    }
    for (var i = 0; i < squares.length; i++) {
        squares[i].removeEventListener('click', turnClick, false);
    }
    $('.finish').css('display','block')

}
