var counter = 0;
var currentPlayer = 0;
var playerColor = ['red', 'blue'];
var countDirection="horizontalRight";
var lastTokenLocationX=null;
var lastTokenLocationY=null;
var currentTokenLocation = [
    ['', '', '', '', '', '', ''],
    ['', '', '', 'red', '', '', ''],
    ['red', '', '', 'red', '', '', ''],
    ['', '', 'red', 'red', 'red', '', 'red'],
    ['red', '', '', 'red', '', '', ''],
    ['red', '', '', '', '', '', ''],
    ['red', '', '', '', '', '', '']
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

function checkConnectFour(){
  var xCordinate=lastTokenLocationX;
  var yCordinate=lastTokenLocationY;
  var oppositePlayer=currentPlayer;
  switch(countDirection){
    case "horizontalRight":
      counter++
      xCordinate++
    while(yCordinate>=0 && yCordinate<=6 && xCordinate>=0 && xCordinate<=6 && currentTokenLocation[yCordinate][xCordinate]===playerColor[currentPlayer]){
       xCordinate++
       counter++;
      }
    countDirection="horizontalLeft";
    if(winner()){return};
    checkConnectFour();
    break;

    case "horizontalLeft":
      xCordinate--
      while(yCordinate>=0 && yCordinate<=6 && xCordinate>=0 && xCordinate<=6 && currentTokenLocation[yCordinate][xCordinate]===playerColor[currentPlayer]){
      xCordinate--
       counter++;
      }
      countDirection="verticalUp";
      if(winner()){return};
      counter=0;
      checkConnectFour();
      break;

      case "verticalUp":
      counter++
      yCordinate--
      while(yCordinate>=0 && yCordinate<=6 && xCordinate>=0 && xCordinate<=6 && currentTokenLocation[yCordinate][xCordinate]===playerColor[currentPlayer]){
      yCordinate--
       counter++;
      }
      countDirection="verticalDown";
      if(winner()){return};
      checkConnectFour();
      break;

      case "verticalDown":
      yCordinate++
      while(yCordinate>=0 && yCordinate<=6 && xCordinate>=0 && xCordinate<=6 && currentTokenLocation[yCordinate][xCordinate]===playerColor[currentPlayer]){
      yCordinate++
       counter++;
      }
      countDirection="diagnolTopRight";
      if(winner()){return};
      counter=0;
      checkConnectFour();
      break;

      case "diagnolTopRight":
      counter++
      yCordinate--; xCordinate++;
      while(yCordinate>=0 && yCordinate<=6 && xCordinate>=0 && xCordinate<=6 && currentTokenLocation[yCordinate][xCordinate]===playerColor[currentPlayer]){
      yCordinate--; xCordinate++;
       counter++;
      }
      countDirection="diagnolbottomLeft";
      if(winner()){return};
      checkConnectFour();
      break;

      case "diagnolbottomLeft":
      yCordinate++; xCordinate--;
      while(yCordinate>=0 && yCordinate<=6 && xCordinate>=0 && xCordinate<=6 && currentTokenLocation[yCordinate][xCordinate]===playerColor[currentPlayer]){
      yCordinate++; xCordinate--;
       counter++;
      }
      countDirection="diagnolTopLeft";
      if(winner()){return};
      counter=0;
      checkConnectFour();
      break; 

      case "diagnolTopLeft":
      counter++
      yCordinate--; xCordinate--;
      while(yCordinate>=0 && yCordinate<=6 && xCordinate>=0 && xCordinate<=6 && currentTokenLocation[yCordinate][xCordinate]===playerColor[currentPlayer]){
      yCordinate--; xCordinate--;
       counter++;
      }
      countDirection="diagnobottomRight";
      if(winner()){return};
      counter=0;
      checkConnectFour();
      break;

      case "diagnobottomRight":
      yCordinate++; xCordinate++;
      while(yCordinate>=0 && yCordinate<=6 && xCordinate>=0 && xCordinate<=6 && currentTokenLocation[yCordinate][xCordinate]===playerColor[currentPlayer]){
      yCordinate++; xCordinate++;
       counter++;
      }
      countDirection="horizontalRight";
      if(winner()){return};
      counter=0;
      break;            
    }
   
  
}
