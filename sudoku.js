/*jshint esversion:6*/
/*jshint -W097*/
/*jshint -W117*/


"use strict";

class Sudoku {
  constructor(board_string) {
    this.boardString = board_string;
    this.mainBoard = [];
    this.board = this.boards();
  }

  boards() {
    let count = 0;
    for (let i = 0; i < 9; i++) {
      this.mainBoard[i] = [];
      for (let j = 0; j < 9; j++) {
        this.mainBoard[i][j] = Number(this.boardString[count]);
        count++;
      }
    }
    return this.mainBoard;
  }

  checkRow(board, row, value) {
    for (let i = 0; i < board[row].length; i++) {
      if (board[row][i] === value)
        return false;
    }
    return true;
  }

  checkColumn(board, column, value) {
    for (let i = 0; i < board.length; i++) {
      if (board[i][column] === value)
        return false;
    }
    return true;
  }

  checkBox(board, column, row, value) {
    let cornerRow = Math.floor(row / 3) * 3;
    let cornerColumn = Math.floor(column / 3) * 3;
    let dimension = 3;

    for (let i = cornerRow; i < cornerRow + dimension; i++) {
      for (let j = cornerColumn; j < cornerColumn + dimension; j++) {
        if (board[i][j] === value) {
          return false;
        }
      }
    }
    return true;
  }

  checkValue(board, column, row, value) {
    if (this.checkRow(board, row, value) &&
      this.checkColumn(board, column, value) &&
      this.checkBox(board, column, row, value)) {
      return true;
    } else {
      return false;
    }
  }

  checkEmptyPositions() {
    let arrIndex = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.mainBoard[i][j] === 0)
          arrIndex.push([i, j]);
      }
    }
    return arrIndex;
  }

  reset_board() {
    console.log("\x1B[2J");
  }

  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

  solve() {
    let emptyPosition = this.checkEmptyPositions();

    for (let i = 0; i < emptyPosition.length;) {
      let row = emptyPosition[i][0];
      let column = emptyPosition[i][1];
      let value = this.board[row][column];
      let found = false;

      while (!found && value <= 9) {
        if (this.checkValue(this.board, column, row, value)) {
          this.sleep(20);
          this.reset_board();
          console.log('--------- Run Solution ----------');
          console.log(this.board);
          console.log('---------------------------------');
          found = true;
          this.board[row][column] = value;
          i++;
        } else {
          value++;
        }
      }
      if (!found) {
        this.board[row][column] = 0;
        i--;
      }
    }
    console.log('', '');
    console.log('-------- Sudoku Solution --------');
    console.log(this.board);
    console.log('---------------------------------');
    return '';
  }
}

var fs = require('fs');
var board_string = fs.readFileSync('example.txt')
  .toString()
  .split("\n")[0];


var game = new Sudoku(board_string);
console.log(game.boards());
console.log(game.solve());
