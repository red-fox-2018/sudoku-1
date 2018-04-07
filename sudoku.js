"use strict"

class Sudoku {
  constructor(board_string) {
    this.generateBoard = []
    this.number = '003020600900305001001806400008102900700000008006708200002609500800203009005010300'
  }

  solve() {}

  // Returns a string representing the current state of the board
  board() {
    var resultBoard = []
    var input = 0
    for (let i = 0; i < 9; i++) {
      var board = []
      for (let j = 0; j < 9; j++) {
        if (this.number[input] == 0) {
          board.push(' ')
        } else {
          board.push(this.number[input])
        }
        input++
      }
      resultBoard.push(board)
    }
    this.generateBoard = resultBoard
    return resultBoard
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
game.solve()

console.log(game.board())
