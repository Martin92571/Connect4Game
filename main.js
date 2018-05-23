$(document).ready(startGame);

var counter = 0;
var tokenCounter = null;
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

function startGame () {
    $('.rows').on('click', 'rowClick', currentPlayerToken());   //select class 'rows', on click event, attach event handler to class "rowClick, run currentPlayerToken function
}

function tiedGame () {
    if (tokenCounter === 49) {  //if tokenCounter is equal to 49
        showModal();    //show modal with tied game message
        return true;
    }
}

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
