var counter = 0;
var currentPlayer = 0;
var playerColor = ['red', 'blue'];
var currentTokenLocation = [
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '']
];

function currentPlayerToken(ColumnPosition){
  ColumnPosition=parseInt(this.attr("column"));
  for(var x=currentTokenLocation.length-1;x>=0;x--){
     if(currentTokenLocation[x][ColumnPosition]===""){
         currentTokenLocation[x][ColumnPosition]=playerColor[currentPlayer];
       checkConnectFour(x,ColumnPosition);
      break;
     }

  }

};
