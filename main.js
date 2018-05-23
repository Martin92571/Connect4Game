var counter = 0;
var currentPlayer = 0;
var playerColor = ['red', 'blue'];
var countDirection="horizontalRight";
var lastTokenLocationX=null;
var lastTokenLocationY=null;
var currentTokenLocation = [
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '']
];

function currentPlayerToken(){
  lastTokenLocationY=parseInt(this.attr("column"));
  for(var x=currentTokenLocation.length-1;x>=0;x--){
     if(currentTokenLocation[x][ColumnPosition]===""){
         currentTokenLocation[x][ColumnPosition]=playerColor[currentPlayer];
         lastTokenLocationX=x;
       checkConnectFour();
      break;
     }

  }

};




// made modal pop up automatically once player wins and inside modal body make a play again button
function winner(){
    if(counter >= 0){
        // need to make onclick for play again button
        var youWon = $('<img src="youwon1.gif">')
        var playAgain = $('<button class="playAgain">').text('Play Again') 
        var winnerMsg = $('<p class="winerMsg">').text('Player: '+ currentPlayer)
        $('.modalBody').append(winnerMsg);
        $('.modalBody').append(youWon);
        $('.modalBody').append(playAgain);
        showModal();
        return true;
    }

}

function showModal(){
    $("#modal").removeClass("reveal");
}


