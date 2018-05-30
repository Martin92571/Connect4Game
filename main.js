$(document).ready(startGame);

var counter = 0;
var tokenCounter = null;
var currentPlayer = 0;

var player=[{playerEffect:false,playerScore:null,playerscorespan:".playerCount1"},{playerEffect:false,playerScore:null,playerscorespan:".playerCount2"}]

var playerColor = [];

var countDirection = "horizontalRight";
var lastTokenLocationX = null;
var lastTokenLocationY = null;
var currentTokenLocationY=null;
var currentTokenLocationX=null;
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
    createGameBoard();
    playerSelection();
    clickHandler();

    //select class 'rows', on click event, attach event handler to class "rowClick, run currentPlayerToken function
}

function clickHandler() {
    $('.resetBtn').on('click', resetGame);
    // $('.startColor').click(function(){
    //     console.log(this)
    // }) 
    $('.startColor').on('click', selectColor);

}

function selectColor() {
    var playerChoice = this.classList[1];
    playerColor.push(playerChoice);
    $(this).addClass('chosen');
    $(this).off();

    if (playerColor.length === 1) {
        $('.playerOneTitle').text('Player 2');
    }
    if(playerColor.length === 2) {
        $('.startColor').off();
        setTimeout(function() {
            $('.modalBody').empty();
            var button = $('<button>',{class:"btnCenter btn btn-lg btn-primary"}).text('Start Game').on('click', hideModal);
            $('.modalBody').append(button);
            /**
             * Hackathon Review
             * May want to turn this into a separate function as well
             */

        }, 1000)
    }
    console.log(this);

}

function createGameBoard(){
    for(var x=0;x<currentTokenLocation.length;x++){
        var row=$("<div>",{class:"rows",row:x});
        for(var i=0;i<currentTokenLocation[x].length;i++){
            var tokens=$("<div>",{class:"tokenClicked column"+i,ylocation:i,column:"column"+i});
            var innerTokenDiv=$("div",{class:"innerToken"});
            tokens.append(innerTokenDiv);
            row.append(tokens);            
        }
        $(".gameBoard").append(row);

    }
    var modal=$("<div>",{id:"modal",class:"reveal"});
    var innerModal=$("<div>",{class:"modalBody"});
    $(modal).append(innerModal);
    $(".gameBoard").append(modal);
    $('.rows>.tokenClicked').on('click', currentPlayerToken);
    $('.rows>.tokenClicked').on("mouseover",hovercolumn)
    /**
     * Hackathon Review
     * May want to condense these down since you already have the selector
     * For example:
     */
    // $('.rows>.tokenClicked')
    //     .on('click', currentPlayerToken)
    //     .on("mouseover",hovercolumn)
    //     .on("mouseleave",hoverColumnRemove);
}
/**
 * Hackathon Review
 * Then instead potentially create function for what's happening opposed to an anonymous function
 */
function hoverColumnRemove() {
    var hoverLocation="."+$(this).attr("column");
    $(hoverLocation).removeClass("hover");
}

function tiedGame() {

       $("modalBody").empty();
    if (tokenCounter === 48) {  //if tokenCounter is equal to 48
        var gameOver = $('<img src="tiedgame.gif">');
        var playAgain = $('<button>', {class:"tiedAgain"}).text('Play Again');
        var tiedMessage = $('<p>',{class:"tiedMessage"}).text('You both lose!');
        $('.modalBody').append(gameOver);
        $('.modalBody').append(playAgain);
        $('.modalBody').append(tiedMessage);
        /**
         * Hackathon Review
         * Append can accept multiple arguments
         * $('.modalBody').append(gameOver, playAgain, tiedMessage);
         */
        showModal();    //show modal with tied game message
        $('.tiedAgain').on('click', resetGame);
        return true;

    }
   
}
function hovercolumn(){
 var hoverLocation="."+$(this).attr("column");
 
 $(hoverLocation).addClass("hover");

}

function currentPlayerToken() {
    
    if(modal){return}
    lastTokenLocationY = parseInt($(this).attr("ylocation"));
    for (var x = currentTokenLocation.length - 1; x >= 0; x--) {
        if (currentTokenLocation[x][lastTokenLocationY] === "") {
            currentTokenLocation[x][lastTokenLocationY] = playerColor[currentPlayer];
            lastTokenLocationX = x;
            break;
        }

    }

    if(lastTokenLocationX===currentTokenLocationX &&lastTokenLocationY===currentTokenLocationY){
        return;
    }
    currentTokenLocationX=lastTokenLocationX;
    currentTokenLocationY=lastTokenLocationY;
    
       
        iterateArrayLocation();
        checkConnectFour();
        tokenCounter++;
        currentPlayer = -currentPlayer + 1;

};

function playerSelection() {
    if (currentPlayer === 0) {
        /**
         * Hackathon Review
         * Instead of doing a comparison for a "0" our condition can include:
         * if (!curren)
         */
        var playerOne = $('<h1 class="playerOneTitle">').text('Player 1');
        var chooseImage = $('<p class="chooseImagePOne">').text('Choose color:');
        var colorRow=$('<div>',{class:"colorRow"})
        var playerColorRed = $('<div class="startColor red">');
        var playerColorBlue =$('<div class="startColor blue">');
        var playerColorYellow =$('<div class="startColor yellow">');
        var playerColorGreen =$('<div class="startColor green">');
        var playerColorOrange =$('<div class="startColor orange">');
        $('.modalBody').append(playerOne);
        $('.modalBody').append(chooseImage);
        $(colorRow).append(playerColorRed);
        $(colorRow).append(playerColorBlue);
        $(colorRow).append(playerColorYellow);
        $(colorRow).append(playerColorGreen);
        $(colorRow).append(playerColorOrange);
        $(".modalBody").append(colorRow);
        showModal();
        /**
         * Hackathon Review
         * This function has repetitive tasks that you can condense down into a for loop
         * Potentially can be changed to make use of an array of colors
         */
        var playerChoiceIndicator = $('<h1>').addClass('playerOneTitle').text('Player 1');
        var chooseImage = $('<p>').addClass('chooseImagePOne').text('Choose color:');
        var colorRow=$('<div>',{class:"colorRow"});
        var colors = ['red', 'blue', 'yellow', 'green', 'orange'];
        for (var currentColor of colors) {
            var playerColorDiv = $('<div>').addClass('startColor ' + currentColor);
            colorRow.append(playerColorDiv);
        }
        


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
        /**
         * HACKATHON REVIEW
         * May want to include sound during this portion to indicate a win
         */
        return true;
    }

}

function modalWinner(){
    currentPlayer = -currentPlayer + 1
    $(".modalBody").empty();
    var youWon = $('<img src="youwon1.gif">');
    var playAgain = $('<button class="playAgain">').text('Play Again');
    var winnerMsg = $('<p class="winerMsg">').text('Player: ' + (currentPlayer+1));
    $('.modalBody').append(winnerMsg);
    $('.modalBody').append(youWon);
    $('.modalBody').append(playAgain);
    $('.playAgain').on('click', resetGame);
    player[currentPlayer].playerScore++
    $(player[currentPlayer].playerscorespan).text(player[currentPlayer].playerScore);

    showModal();
} 




function showModal() {
    $("#modal").removeClass("reveal");
    

}

function hideModal() {
    $('.modalBody').empty();
    $('#modal').addClass("reveal")
}

function iterateArrayLocation() {
    var mergedArray = [].concat.apply([], currentTokenLocation);
    for (x = mergedArray.length - 1; x >= 0; x--) {
        var clickedLocation = '.tokenClicked:nth(' + (x) + ")";
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
    $('.tokenClicked').removeClass(playerColor[0])
    $('.tokenClicked').removeClass(playerColor[1])
    hideModal();
    modal = false;
}

