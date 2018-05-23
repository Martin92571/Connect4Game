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


document.querySelector('#modalButton').addEventListener('click', showModal)

function showModal(){
    document.querySelector('#modalShadow').style.display = "block"
}

function winner(){
    if(counter === 4){
        showModal()

    }
}
