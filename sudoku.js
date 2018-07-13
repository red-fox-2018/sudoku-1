"use strict"

class Sudoku {
  constructor(board_string) {
    this.board = []
    this.unsolved = board_string
    this.arr = []
  }

  boards() {
    var number = this.unsolved
    var mark = 0
    var rows = []
    for(var i = 0; i < number.length; i++) {
      rows.push(number[i])
      mark++
      if(mark === 9) {
        this.board.push(rows)
        rows = []
        mark = 0
      }
    }
    console.log(this.board)
  }

  checkRow(row, col) {
    var number = this.board[row][col]
    for(var i = 0; i < this.board.length; i++) {
      if(this.board[i][col] == number && i !== row) {
        return false
      }
    }
    return true
  }

  checkCol(row, col) {
    var number = this.board[row][col]
    for(var i = 0; i < this.board.length; i++) {
      if(this.board[row][i] == number && i !== col) {
        return false
      }
    }
    return true
  }

  checkBox(row, col) {
     var rowPoint = Math.floor(row/3) * 3
     var colPoint = Math.floor(col/3) * 3
     var number = this.board[row][col]

     for(var i = rowPoint; i < rowPoint + 3; i++) {
       for(var j = colPoint; j < colPoint + 3; j++) {
         if(this.board[i][j] == number && i !== row && j !== col) {
           return false
         }
       }
     }
     return true
  }

  checkZero() {
    for(var i = 0; i < this.board.length; i++) {
      var rowCoord = []
      for(var j = 0; j < this.board[i].length; j++) {
        if(this.board[i][j] === '0') {
          rowCoord.push(i)
          rowCoord.push(j)
          this.arr.push(rowCoord)
          rowCoord = []
        }
      }
    }
    return this.arr
  }

  solve() {
    for(var i = 0; i < this.arr.length; i++) {
      var row = this.arr[i][0]
      var col = this.arr[i][1]
      var num = this.board[row][col]
      var solved = false
      while(num !== 9) {
        num++
        this.board[row][col] = num
        if(this.checkRow(row, col) && this.checkCol(row, col) && this.checkBox(row, col)) {
          solved = true
          break;
        }
      }
      if(solved === false) {
        this.board[row][col] = 0
        if(i === 0) {
          i++
        } else {
          i -= 2
        }
      }
    }
  }

  print_boards() {
    for(var i = 0; i < this.board.length; i++) {
      var str = ''
      for(var j = 0; j < this.board[i].length; j++) {
        str += this.board[i][j]
        if (j === 2 || j === 5) {
          str += '|'
        }
      }
      if(i === 2 || i === 5) {
        str += '\n' + '-----------'
      }
      console.log(str);
    }
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
game.boards()
game.checkZero()
game.solve()
game.print_boards()
