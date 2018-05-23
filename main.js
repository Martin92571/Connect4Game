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
  for(var x=current_token_location_on_game_board.length-1;x>=0;x--){
     if(current_token_location_on_game_board[x][ColumnPosition]===""){
       current_token_location_on_game_board[x][ColumnPosition]=playerColor[currentPlayer];
       checkConnectFour(x,ColumnPosition);
      break;
     }

  }

};
