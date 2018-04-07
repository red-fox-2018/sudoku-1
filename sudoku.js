"use strict"

class Sudoku {
  constructor(board_string) {
    this.input = board_string;
    this.board = [];
    
  }

  generateBoard() {
    var multiDim=[];
    var arr=[];
    var splitWord=this.input.split('');
      for(var i=0;i<splitWord.length;i++){
        arr.push(Number(splitWord[i]));
        if(arr.length===9){
           multiDim.push(arr);
           arr=[];
        } 
      }
     this.board = multiDim
     return multiDim;
  }


 checkRow(row,value) {
    var count=1;
    for(var j=0;j<this.board[row].length;j++) {
      if(this.board[row][j]!==value) {
        count*=1;
      }else {
        count*=0;
      }
     } 
    if(count===1){
      return true;
    }else{
      return false;  
    }
        
 }  
    
 

 checkColumn(col,value) {
    var count=1;
    for(var i=0;i<this.board.length;i++) {
      if(this.board[i][col]!==value) {
        count*=1;
      }else {
        count*=0;
      }
    }
    if(count===1){
      return true;
    }else {
      return false;
    }
 }

 checkSquare(xIndex0,yIndex0,value){
    var arr=[];
    var count=1;
    if(xIndex0<=2 && yIndex0<=2) {
      for(var i=0;i<=2;i++) {
        for(var j=0;j<=2;j++){
          arr.push(this.board[i][j]);
        }  
      }
    }

    if(xIndex0<=2 && yIndex0>=3 && yIndex0<=5) {
      for(var i=0;i<=2;i++) {
        for(var j=3;j<=5;j++){
          arr.push(this.board[i][j]);
        }  
      }
    }


    if(xIndex0<=2 && yIndex0>=6 && yIndex0<=8) {
      for(var i=0;i<=2;i++) {
        for(var j=6;j<=8;j++){
          arr.push(this.board[i][j]);
        }  
      }
    }

    if(xIndex0<=5 && xIndex0>=3 && yIndex0<=2) {
      for(var i=3;i<=5;i++) {
        for(var j=0;j<=2;j++){
          arr.push(this.board[i][j]);
        }  
      }
    }

    if(xIndex0<=5 && xIndex0>=3 && yIndex0>=3 && yIndex0<=5) {
      for(var i=3;i<=5;i++) {
        for(var j=3;j<=5;j++){
          arr.push(this.board[i][j]);
        }  
      }
    }

    if(xIndex0<=5 && xIndex0>=3 && yIndex0>=6 && yIndex0<=8) {
      for(var i=3;i<=5;i++) {
        for(var j=6;j<=8;j++){
          arr.push(this.board[i][j]);
        }  
      }
    }

    if(xIndex0<=8 && xIndex0>=6 && yIndex0<=2) {
      for(var i=6;i<=8;i++) {
        for(var j=0;j<=2;j++){
          arr.push(this.board[i][j]);
        }  
      }
    }

    if(xIndex0<=8 && xIndex0>=6 && yIndex0>=3 && yIndex0<=5) {
      for(var i=6;i<=8;i++) {
        for(var j=3;j<=5;j++){
          arr.push(this.board[i][j]);
        }  
      }
    }

    if(xIndex0<=8 && xIndex0>=6 && yIndex0>=6 && yIndex0<=8) {
      for(var i=6;i<=8;i++) {
        for(var j=6;j<=8;j++){
          arr.push(this.board[i][j]);
        }  
      }
    }

    //=========EVALUATE==========
    for(var i=0;i<arr.length;i++){
      if(arr[i]!== value) {
        count*=1
      }else{
        count*=0
      }
    }

    if(count===1) {
      return true
    }else {
      return false;
    }
 }
 //method ini ingin dipakai untuk melakukan pengulangan jika masi ada kolom yang belum terisi,
 //tapi masih bingung implementasinya.
 checkPsb() {
  var arrIndex0=[];
  for(var i=0;i<this.board.length;i++) {
    for(var j=0;j<this.board[i].length;j++){
        var objIndex0={};
        objIndex0.x=0;
        objIndex0.y=0;
        objIndex0.psb=[];
      if(this.board[i][j]===0) {
        for(var k=9;k>0;k--){
          objIndex0.x=i;
          objIndex0.y=j;
          objIndex0.psb.push(k)
        }
      arrIndex0.push(objIndex0)       
      }
    } 
  }
  return arrIndex0;
 }

 solve() {
    var xIndex0=0;
    var yIndex0=0;
    
    for(let i=0;i<this.board.length;i++) {
      for(let j=0;j<this.board[i].length;j++){
        if(this.board[i][j]===0){
          xIndex0=i;
          yIndex0=j;
          for(var k=9;k>0;k--){
            if(this.checkRow(i,k) && this.checkColumn(j,k) && this.checkSquare(xIndex0,yIndex0,k)){
              this.board[i][j]=k;
            }       
          }    
           
        }
      } 
    }
    return this.board;  
  }

} 




// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.generateBoard();


console.log("===========SOAL===========")
console.log(game.generateBoard())
console.log("\n")
//console.log(game.checkPsb());
console.log("===========JAWABAN===========")
console.log(game.solve())
//  