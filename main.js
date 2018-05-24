$(document).ready(startGame);

var counter = 0;
var tokenCounter = null;
var currentPlayer = 0;
var playerColor = ['red', 'blue'];
var countDirection = "horizontalRight";
var lastTokenLocationX = null;
var lastTokenLocationY = null;
var modal = false;
var currentTokenLocation = [
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '']
];

function startGame() {
    clickHandler();

    playerSelection();

    // createGameBoard();
    //select class 'rows', on click event, attach event handler to class "rowClick, run currentPlayerToken function
}

function clickHandler() {
    $('.rows > .rowClick').on('click', currentPlayerToken);
    console.log('startgame test ');
    $('.resetBtn').on('click', resetGame);


}

function tiedGame() {
    if (tokenCounter === 48) {  //if tokenCounter is equal to 48
        var gameOver = $('<img src="tiedgame.gif">');
        var playAgain = $('<button class="playAgain">').text('Play Again');
        var tiedMessage = $('<p class="tiedMessageText">').text('You both lose!');
        $('.modalBody').append(gameOver);
        $('.modalBody').append(playAgain);
        $('.modalBody').append(tiedMessage);
        showModal();    //show modal with tied game message
        $('.playAgain').on('click', resetGame);
        return true;
    }
}

function currentPlayerToken() {
    if(modal){return}
    lastTokenLocationY = parseInt($(this).attr("column"));
    for (var x = currentTokenLocation.length - 1; x >= 0; x--) {
        if (currentTokenLocation[x][lastTokenLocationY] === "") {
            currentTokenLocation[x][lastTokenLocationY] = playerColor[currentPlayer];
            lastTokenLocationX = x;
            break;
        }

    }
    
        iterateArrayLocation();
        checkConnectFour();
        currentPlayer = -currentPlayer + 1;
        debugger;
        tokenCounter++;
        console.log('tiedgame test', tokenCounter);

};

function playerSelection() {
    if (currentPlayer === 0) {
        var playerOne = $('<h1 class="playerOneTitle">').text('Player 1');
        var chooseImage = $('<p class="chooseImagePOne">').text('Choose color:');
        var playerColorRed = $('<div class="red">');
        var playerColorBlue =$('<div class="blue">');
        var playerColorYellow =$('<div class="yellow">');
        var playerColorGreen =$('<div class="green">');
        var playerColorOrange =$('<div class="orange">');
        $('.modalBody').append(playerOne);
        $('.modalBody').append(chooseImage);
        $('.modalBody').append(playerColorRed);
        $('.modalBody').append(playerColorBlue);
        $('.modalBody').append(playerColorYellow);
        $('.modalBody').append(playerColorGreen);
        $('.modalBody').append(playerColorOrange);
        showModal();
    } else if (currentPlayer === 1) {
        var playerTwo = $('<h1 class="playerTwoTitle">').text('Player 2');
        var chooseImage = $('<p class="chooseImagePTwo">').text('Choose color:');
        var playerColorRed = $('<div class="red">');
        var playerColorBlue =$('<div class="blue">');
        var playerColorYellow =$('<div class="yellow">');
        var playerColorGreen =$('<div class="green">');
        var playerColorOrange =$('<div class="orange">');
        $('.modalBody').append(playerTwo);
        $('.modalBody').append(chooseImage);
        $('.modalBody').append(playerColorRed);
        $('.modalBody').append(playerColorBlue);
        $('.modalBody').append(playerColorYellow);
        $('.modalBody').append(playerColorGreen);
        $('.modalBody').append(playerColorOrange);
        showModal();
    }
}

function checkConnectFour(){
        var xCordinate=lastTokenLocationX;
        var yCordinate=lastTokenLocationY;
        var direction=0;
        switch(countDirection){
            case "horizontalRight":
            counter++
            direction=0;
            checkDirection(xCordinate,yCordinate,direction)
            countDirection="horizontalLeft";
            if(winner() || tiedGame()){return};
            checkConnectFour();
            break;

            case "horizontalLeft":
            direction=1;
            checkDirection(xCordinate,yCordinate,direction)
            countDirection="verticalUp";
            if(winner() || tiedGame()){return};
            counter=0;
            checkConnectFour();
            break;

            case "verticalUp":
            counter++
            direction=2;
            checkDirection(xCordinate,yCordinate,direction)
            countDirection="verticalDown";
            if(winner() || tiedGame()){return};
            checkConnectFour();
            break;

            case "verticalDown":
            direction=3;
            checkDirection(xCordinate,yCordinate,direction)
            countDirection="diagnolTopRight";
            if(winner() || tiedGame()){return};
            counter=0;
            checkConnectFour();
            break;

            case "diagnolTopRight":
            counter++
            direction=4;
            checkDirection(xCordinate,yCordinate,direction)
            countDirection="diagnolbottomLeft";
            if(winner() || tiedGame()){return};
            checkConnectFour();
            break;

            case "diagnolbottomLeft":
            direction=5;
            checkDirection(xCordinate,yCordinate,direction)
            countDirection="diagnolTopLeft";
            if(winner() || tiedGame()){return};
            counter=0;
            checkConnectFour();
            break; 

            case "diagnolTopLeft":
            counter++
            direction=6;
            checkDirection(xCordinate,yCordinate,direction)
            countDirection="diagnobottomRight";
            if(winner() || tiedGame()){return};
            checkConnectFour();
            break;

            case "diagnobottomRight":
            direction=7;
            checkDirection(xCordinate,yCordinate,direction)
            countDirection="horizontalRight";
            if(winner() || tiedGame()){return};
            counter=0;
            break;            
            }
        }
        
    


function checkDirection(xCordinate,yCordinate,direction){
    var countArrayDirection=[[0,1],[0,-1],[-1,0],[1,0],[1,-1],[-1,1],[-1,-1],[1,1]];
         xCordinate+=countArrayDirection[direction][0];
         yCordinate+=countArrayDirection[direction][1];
    while(yCordinate>=0 && yCordinate<=6 && xCordinate>=0 && xCordinate<=6 && currentTokenLocation[xCordinate][yCordinate]===playerColor[currentPlayer]){
         xCordinate+=countArrayDirection[direction][0];
         yCordinate+=countArrayDirection[direction][1];
         counter++;
        }

}



// made modal pop up automatically once player wins and inside modal body make a play again button
function winner() {
    if (counter >= 4) {
        modal = true;
        setTimeout(modalWinner, 2000);
        return true;
    }

}

function modalWinner(){
    $(".modalBody").empty();
    var youWon = $('<img src="youwon1.gif">');
    var playAgain = $('<button class="playAgain">').text('Play Again');
    var winnerMsg = $('<p class="winerMsg">').text('Player: ' + currentPlayer);
    $('.modalBody').append(winnerMsg);
    $('.modalBody').append(youWon);
    $('.modalBody').append(playAgain);
    $('.playAgain').on('click', resetGame);
    showModal();
}

// functions that removes the class that has display:none 
function showModal() {
    $("#modal").removeClass("reveal");
    $('.playAgain').on('click', hideModal);

}

function hideModal() {
    $('#modal').addClass("reveal")
}

function iterateArrayLocation() {
    var mergedArray = [].concat.apply([], currentTokenLocation);
    console.log(mergedArray);
    for (x = mergedArray.length - 1; x >= 0; x--) {
        var clickedLocation = '.rowClick:nth(' + (x) + ")";
        console.log('this is the ' + clickedLocation)
        $(clickedLocation).addClass(mergedArray[x]);
    }
}


function resetGame() {
    counter = 0;
    currentPlayer = 0;
    tokenCounter = null;
    lastTokenLocationX = null;
    lastTokenLocationY = null;
    currentTokenLocation = [
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '']
    ];
    $('.rowClick').removeClass('red')
    $('.rowClick').removeClass('blue')
    modal = false;
}

