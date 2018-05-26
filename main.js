$(document).ready(startGame);   //Oh. hai Mark.

var counter = 0;    //variable used in functions: checkConnectFour, checkDirection, winner, resetGame
var tokenCounter = null;    //variable used in functions: tiedGame, currentPlayerToken, resetGame
var currentPlayer = 0;  //variable used in functions: currentPlayerToken, playerSelection, checkDirection, modalWinner, resetGame
var player=[{playerEffect:false,playerScore:null,playerscorespan:".playerCount1"},{playerEffect:false,playerScore:null,playerscorespan:".playerCount2"}]
var playerColor = [];   //variable used in functions: selectColor, currentPlayerToken, checkDirection, resetGame
var countDirection = "horizontalRight"; //variable used in function: checkConnectFour
var lastTokenLocationX = null;  //variable used in functions: currentPlayerToken, checkConnectFour, resetGame
var lastTokenLocationY = null;  //variable used in functions: currentPlayerToken, checkConnectFour, resetGame
var currentTokenLocationY=null; //variable used in function: currentPlayerToken
var currentTokenLocationX=null; //variable used in function: currentPlayerToken
var modal = false;  //variable used in functions: currentPlayerToken, winner, resetGame
var currentTokenLocation = [    //variable used in functions: createGameBoard, currentPlayerToken, checkDirection, iterateArrayLocation, resetGame
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '']
];

function startGame() {  //function that contains functions that are ready when window is finished loading
    createGameBoard();  //call createGameBoard function first
    playerSelection();  //call playerSelection function
    clickHandler();     //call clickHandler function
}

function clickHandler() {
    $('.resetBtn').on('click', resetGame);  //add click handler to .resetBtn that runs resetGame function
    // $('.startColor').click(function(){
    //     console.log(this)
    // }) 
    $('.startColor').on('click', selectColor);  //add click handler to .startColor that runs selectColor function
}

function selectColor() {
    var playerChoice = this.classList[1];   //store selected color(this) in classList and store classList in playerChoice
    playerColor.push(playerChoice);     //push playerChoice into playerColor
    $(this).addClass('chosen');     //adds class "chosen" to this(.startColor that was clicked)
    $(this).off();      //remove event handlers using .off() method from this(.startColor that was clicked)

    if (playerColor.length === 1) {     //checks if playerColor array length is equal to 1
        $('.playerOneTitle').text('Player 2');  //if check is true, select the .playerOneTitle and add text "Player 2"
    }

    if(playerColor.length === 2) {      //checks if playerColor array length is equal to 2
        $('.startColor').off();     //if check is true, removes event handlers from .startColor(all color choices)

        setTimeout(function() {     //Timed function that executes after 1 second
            $('.modalBody').empty();    //removes all content in .modalBody using .empty() method
            var button = $('<button>',{class:"btnCenter btn btn-lg btn-primary"}).text('Start Game').on('click', hideModal);    //creates button using jQuery, used bootstrap to create a large button and sets color "btn-primary" adds text "Start Game" to button using .text method, adds click event that hides modal
            $('.modalBody').append(button); //appends button to .modalBody
        }, 1000)
    }
    console.log(this);  //What is this?

}

function createGameBoard(){
    for(var x=0;x<currentTokenLocation.length;x++){     //for loop that iterates through currentTokenLocation array length
        var row=$("<div>",{class:"rows",row:x});    //creates rows using current value of x in for loop
        for(var i=0;i<currentTokenLocation[x].length;i++){  //for loop that iterates through div.tokens to add to div.row
            var tokens=$("<div>",{class:"tokenClicked column"+i,ylocation:i,column:"column"+i});    //creates tokens for each row
            var innerTokenDiv=$("div",{class:"innerToken"});    //div for player token that goes into .tokenClicked
            tokens.append(innerTokenDiv);   //appends (innerTokenDiv)"player tokens" to (tokens)"game board token slots"
            row.append(tokens);     //appends (tokens)"game board token slots" to (row)"current row iteration"
        }
        $(".gameBoard").append(row);    //appends (row) to the game board

    }
    var modal=$("<div>",{id:"modal",class:"reveal"});   //create modal that can be hidden using class "reveal"
    var innerModal=$("<div>",{class:"modalBody"});  //create modal body that can be cleared and reused for game start, game win, and game tied
    $(modal).append(innerModal);        //append the modalBody to the modal container
    $(".gameBoard").append(modal);      //append the modal to the div with class of "gameBoard"
    $('.rows>.tokenClicked').on('click', currentPlayerToken);   //add click handler to .tokenClicked that runs currentPlayerToken function
    $('.rows>.tokenClicked').on("mouseover",hovercolumn)    //adds click handler to .tokenClicked that runs hovercolumn Function
}

function tiedGame() {
    $("modalBody").empty();     //empty the contents of modalBody
    if (tokenCounter === 48) {  //if tokenCounter is equal to 48(game board full)
        var gameOver = $('<img src="tiedgame.gif">');   //create image tag for game over
        var playAgain = $('<button>', {class:"tiedAgain"}).text('Play Again');  //create button with class of "tiedAgain" and text of "Play Again"
        var tiedMessage = $('<p>',{class:"tiedMessage"}).text('You both lose!');    //
        $('.modalBody').append(gameOver);
        $('.modalBody').append(playAgain);
        $('.modalBody').append(tiedMessage);
        showModal();    //show modal with tied game message
        $('.tiedAgain').on('click', resetGame);
        return true;

    }

}
function hovercolumn(){     //rename hoverColumn? *********************************************
 var hoverLocation="."+$(this).attr("column");

 $(hoverLocation).addClass("hover");
 $('.rows>.tokenClicked').on("mouseleave",function(){

    $(hoverLocation).removeClass("hover");


 });
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

