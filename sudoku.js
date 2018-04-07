"use strict"

class Sudoku {
  constructor (str) {
    this.table = [];
    this.col = [];
    this.case = str;
    this.count = 0;
    this.arr = []
    this.obj = {}
    this.lostnumbers = []
    this.cek = [];
  }
  // Returns a string representing the current state of the board
  board() {
    for (let row = 0; row < 9; row++) {
      this.col = [];
      for (let col = 0; col < 9; col++) {
        this.col.push(this.case[this.count]);
        this.count++
      }
      this.table.push(this.col)
    }
  }

  countZero(i) {
    this.count = 0
    for (let j = 0; j < 9; j++) {
      if (this.table[i][j] == 0) {
      this.count++
      }
    }
    this.obj[i].zero = this.count
  }

  createObject() {
    for (let i = 0; i < 9; i++) {
      this.arr = []
      this.lostnumbers = []
      for (let j = 0; j < 9; j++) {
        if(this.table[i][j] == 0) {
          this.arr.push(j);
        }
        if (this.table[i].indexOf((j+1).toString()) === -1) {
          this.lostnumbers.push(j+1)
        }
      }
      if (this.obj[i] == undefined) {
        this.obj[i] = {}
        this.obj[i].posisi = this.arr
        this.obj[i].lost = this.lostnumbers
      } else {
        this.obj[i].posisi = this.arr
        this.obj[i].lost = this.lostnumbers
      }
    }
  }

  checker (i){
    for (let key in this.obj[i].lost) {
      this.cek = [];
      for (let j = 0; j < 9; j++) {
        if ((this.obj[i].lost[key]) != this.table[i][j] && this.obj[i].lost[key] != this.table[j][this.obj[i].posisi[key]]) {
          this.cek.push(true)
        }
      }
      if (i < 3) {
        this.boxChecker(0,3,this.obj[i].posisi[key], i, this.obj[i].lost[key])
      }else if(i < 6) {
        this.boxChecker(3,6,this.obj[i].posisi[key], i, this.obj[i].lost[key])
      }else {
        this.boxChecker(6,9,this.obj[i].posisi[key], i, this.obj[i].lost[key])
      }
      if (this.cek.length == 18) {
        this.table[i][this.obj[i].posisi[key]] = this.obj[i].lost[key].toString()
        this.obj[i].cocok.push(true, this.obj[i].lost[key].toString(), this.obj[i].posisi[key])
      }else {
        this.obj[i].cocok.push(false)
      }
    }
  }

  boxChecker(start, finish, j, row, lost) {
    for (let i = start; i < finish; i++) {
      if (j < 3) {
        for (let j = 0; j < 3; j++) {
          if (lost != this.table[i][j]) {
            this.cek.push(true)
          }
        }
      }else if (j < 6) {
        for (let j = 3; j < 6; j++) {
          if (lost != this.table[i][j]) {
            this.cek.push(true)
          }
        }
      }else {
        for (let j = 6; j < 9; j++) {
          if (lost != this.table[i][j]) {
            this.cek.push(true)
          }
        }
      }
    }
  }
  
  solve () {
    this.board()
    // console.log(this.table) 
    this.createObject()
    console.log('============BEFORE==============')
    for (let i = 0; i < 9; i++) {
      console.log(this.table[i].join(' | '))
    }
    console.log('=============AFTER==============')
    for (let i = 0; i < 9; i++) {
      this.obj[i].cocok = []
      this.checker(i);
      this.countZero(i);
      console.log(this.table[i].join(' | '))
      // console.log('------')
    }
    // console.log(this.table)
    // console.log(this.cocok)
    console.log(this.obj)
  }   
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-02_project-euler_50-easy-puzzles.txt')
  .toString()
  .split("\n")[0]
// var board_string = '369052478850674931714308265683927154597416820021835697138769042240583719905241306'
var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()
// game.checkZero()
// game.checkLostNumber()
// game.fillBoard()
// game.checkCol();
// game.checkRow();

// console.log(game.board())
// console.log(game.solve())
