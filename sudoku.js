/*jshint esversion:6*/
/*jshint -W097*/
/*jshint -W117*/

"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardString = board_string;
    this.board = this.papan();
  }

  papan () {
    let row = [];
    let papan = [];

    for(let i = 0 ; i < this.boardString.length ; i++){
      row.push(+(this.boardString)[i]);
      if(row.length === 9){
        papan.push(row);
        row = [];
      }
    }
    return papan;
  }

  checkRow (papan,row,value) {
    for(let i = 0 ; i < this.board.length ; i++){
      if(this.board[row][i] === value)
        return false;
    }
    return true;
  }

  checkColumn (papan,column,value) {
    for(let i = 0 ; i < this.board.length ; i++){
      if(this.board[i][column] === value)
        return false;
    }
    return true;
  }

  checkBox(papan, column, row, value) {
    let cornerRow = Math.floor(row / 3) * 3;
    let cornerColumn = Math.floor(column / 3) * 3;
    let dimensi = 3;

    for (let i = cornerRow; i < cornerRow + dimensi; i++) {
      for (let j = cornerColumn; j < cornerColumn + dimensi; j++) {
        if (this.board[i][j] === value) {
          return false;
        }
      }
    }
    return true;
  }

  checkValue(papan, column, row, value) {
    if (this.checkRow(papan, row, value) && this.checkColumn(papan, column, value) && this.checkBox(papan, column, row, value)) {
      return true;
    } else {
      return false;
    }
  }

  checkZero(){
    let posisiNol =[];
      for(let i = 0 ; i < 9 ; i++){
        for(let j = 0 ; j < 9 ; j++){
          if(this.board[i][j] === 0){
            posisiNol.push([i,j]);
          }
        }
      }
      return posisiNol;
    }

    solve() {
      let angka = 0;
      let indexNol = this.checkZero();

      for(let i = 0 ; i < indexNol.length;){
        let row = indexNol[i][0];
        let column =indexNol[i][1];
        let value = this.board[row][column]+1;
        let isFind =false;

        while(!isFind && value <= 9){
          angka++;
          if(this.checkValue(this.board,column,row,value)){
            isFind = true;
            this.board[row][column] = value;
            i++;
          }
          else{
            value++;
          }
        }
        if(!isFind){
          this.board[row][column] = 0;
          i--;
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

// Remember: this will just fill out what it can and not "guess

console.log(game.papan())
console.log(game.solve())
