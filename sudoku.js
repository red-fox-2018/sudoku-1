"use strict"
const Table = require('cli-table');
const chalk = require('chalk');

class Sudoku {
  constructor(board_string) {
    this.unsolved = board_string
  }

  solve() {
    let zeroIndex = this.findZeroIndex()
    let board = this.board()

    let table = new Table({
      colWidths: [3, 3, 3, 3, 3, 3, 3, 3, 3]
    });

    board.forEach(res => {
      table.push(
        (res)
      );
    })

    let max = 9;
    for (let i = 0; i < zeroIndex.length;) {
      let row = zeroIndex[i][0];
      let col = zeroIndex[i][1];
      let num = board[row][col] + 1;
      let foundNum = false;

      while (!foundNum && num <= max) {
        if (this.checkAll(board, zeroIndex[i], num)) {
          foundNum = true;
          board[row][col] = num;
          i++;
          this.reset_board();
          console.log(chalk.red(table.toString()));
          this.sleep(100);
        } else {
          num++;
        }
      }
      if (foundNum == false) {
        board[row][col] = 0;
        i--;
      }
    }

    console.log(chalk.green(table.toString()));
  }

  findZeroIndex() {
    let board = this.board();
    let zeroIndex = [];

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] == 0) {
          let index = [i, j];
          zeroIndex.push(index);
        }
      }
    }

    return zeroIndex;
  }

  checkAll(board, zeroIndex, num) {
    if (this.checkHorizontal(board, zeroIndex, num) && this.checkVertical(board, zeroIndex, num) && this.checkSquare(board, zeroIndex, num)) {
      return true;
    }

    return false;
  }

  checkHorizontal(board, zeroIndex, num) {
    for (let i = 0; i < board.length; i++) {
      if (board[zeroIndex[0]][i] == num) {
        return false;
      }
    }

    return true;
  }

  checkVertical(board, zeroIndex, num) {
    for (let i = 0; i < board.length; i++) {
      if (board[i][zeroIndex[1]] == num) {
        return false;
      }
    }

    return true;
  }

  checkSquare(board, zeroIndex, num) {
    let row = Math.floor(zeroIndex[0] / 3) * 3;
    let col = Math.floor(zeroIndex[1] / 3) * 3;

    for (let i = row; i < 3; i++) {
      for (let j = col; j < 3; j++) {
        if (board[i][j] == num) {
          return false;
        }
      }
    }

    return true;
  }

  // Returns a string representing the current state of the board
  board() {
    let numStr = this.unsolved;
    let sudokuBoard = [];
    let index = 0;

    let counter = 0
    for (let i = 0; i < 9; i++) {
      let temp = []
      for (let j = 0; j < 9; j++) {
        temp.push(Number(numStr[index]));
        index++
      }
      sudokuBoard.push(temp);
    }
    return sudokuBoard;
  }

  sleep(milliseconds) {
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

  reset_board() {
    console.log("\x1B[2J")
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string);

// Remember: this will just fill out what it can and not "guess"
game.solve();