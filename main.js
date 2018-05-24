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
    //select class 'rows', on click event, attach event handler to class "rowClick, run currentPlayerToken function
}

function clickHandler() {
    $('.rows > .rowClick').on('click', currentPlayerToken);
    console.log('startgame test ')
    $('.resetBtn').on('click', resetGame);


}

function tiedGame() {
    if (tokenCounter === 49) {  //if tokenCounter is equal to 49
        var gameOver = $('<img src="tiedgame.gif">');
        var playAgain = $('<button class="playAgain">').text('Play Again');
        var tiedMessage = $('<p class="tiedMessageText">').text('You both lose!');
        $('.modalBody').append(gameOver);
        $('.modalBody').append(playAgain);
        $('.modalBody').append(tiedMessage);
        showModal();    //show modal with tied game message
        return true;
    }
}

function currentPlayerToken() {
    lastTokenLocationY = parseInt($(this).attr("column"));
    for (var x = currentTokenLocation.length - 1; x >= 0; x--) {
        if (currentTokenLocation[x][lastTokenLocationY] === "") {
            currentTokenLocation[x][lastTokenLocationY] = playerColor[currentPlayer];
            lastTokenLocationX = x;
            break;
        }

    }
    if(!modal) {
        iterateArrayLocation();
        checkConnectFour();
        currentPlayer = -currentPlayer + 1;
    }

};


function checkConnectFour() {
    var xCordinate = lastTokenLocationX;
    var yCordinate = lastTokenLocationY;
    switch (countDirection) {
        case "horizontalRight":
            counter++
            yCordinate++
            while (yCordinate >= 0 && yCordinate <= 6 && xCordinate >= 0 && xCordinate <= 6 && currentTokenLocation[xCordinate][yCordinate] === playerColor[currentPlayer]) {
                yCordinate++
                counter++;
            }
            countDirection = "horizontalLeft";
            if (winner()) { return };
            checkConnectFour();
            break;

        case "horizontalLeft":
            yCordinate--
            while (yCordinate >= 0 && yCordinate <= 6 && xCordinate >= 0 && xCordinate <= 6 && currentTokenLocation[xCordinate][yCordinate] === playerColor[currentPlayer]) {
                yCordinate--
                counter++;
            }
            countDirection = "verticalUp";
            if (winner()) { return };
            counter = 0;
            checkConnectFour();
            break;

        case "verticalUp":
            counter++
            xCordinate--
            while (yCordinate >= 0 && yCordinate <= 6 && xCordinate >= 0 && xCordinate <= 6 && currentTokenLocation[xCordinate][yCordinate] === playerColor[currentPlayer]) {
                xCordinate--
                counter++;
            }
            countDirection = "verticalDown";
            if (winner()) { return };
            checkConnectFour();
            break;

        case "verticalDown":
            xCordinate++
            while (yCordinate >= 0 && yCordinate <= 6 && xCordinate >= 0 && xCordinate <= 6 && currentTokenLocation[xCordinate][yCordinate] === playerColor[currentPlayer]) {
                xCordinate++
                counter++;
            }
            countDirection = "diagnolTopRight";
            if (winner()) { return };
            counter = 0;
            checkConnectFour();
            break;

        case "diagnolTopRight":
            counter++
            yCordinate--; xCordinate++;
            while (yCordinate >= 0 && yCordinate <= 6 && xCordinate >= 0 && xCordinate <= 6 && currentTokenLocation[xCordinate][yCordinate] === playerColor[currentPlayer]) {
                yCordinate--; xCordinate++;
                counter++;
            }
            countDirection = "diagnolbottomLeft";
            if (winner()) { return };
            checkConnectFour();
            break;

        case "diagnolbottomLeft":
            yCordinate++; xCordinate--;
            while (yCordinate >= 0 && yCordinate <= 6 && xCordinate >= 0 && xCordinate <= 6 && currentTokenLocation[xCordinate][yCordinate] === playerColor[currentPlayer]) {
                yCordinate++; xCordinate--;
                counter++;
            }
            countDirection = "diagnolTopLeft";
            if (winner()) { return };
            counter = 0;
            checkConnectFour();
            break;

        case "diagnolTopLeft":
            counter++
            yCordinate--; xCordinate--;
            while (yCordinate >= 0 && yCordinate <= 6 && xCordinate >= 0 && xCordinate <= 6 && currentTokenLocation[xCordinate][yCordinate] === playerColor[currentPlayer]) {
                yCordinate--; xCordinate--;
                counter++;
            }
            countDirection = "diagnobottomRight";
            if (winner()) { return };
            checkConnectFour();
            break;

        case "diagnobottomRight":

            yCordinate++; xCordinate++;
            while (yCordinate >= 0 && yCordinate <= 6 && xCordinate >= 0 && xCordinate <= 6 && currentTokenLocation[xCordinate][yCordinate] === playerColor[currentPlayer]) {
                yCordinate++; xCordinate++;
                counter++;
            }
            countDirection = "horizontalRight";
            if (winner()) { return };
            counter = 0;
            break;
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

