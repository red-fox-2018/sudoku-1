"use strict"

class Sudoku {
  constructor (str) {
    this.table = [];
    this.col = [];
    this.case = str;
    this.count = 0;
    this.arr = []
    this.obj = {}
    this.cek = [];
    this.pos = [];
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

  createObject() {
    for (let i = 0; i < 9; i++) {
      this.arr = [];
      for (let j = 0; j < 9; j++) {
        if(this.table[i][j] == 0) {
          this.arr.push(j);
        }
      }
      if (this.obj[i] == undefined) {
        this.obj[i] = {}
        this.obj[i].posisi = this.arr
      } else {
        this.obj[i].posisi = this.arr
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

  check (posisi, value, i){
    this.cek = [];
    for (let j = 0; j < 9; j++) {
      if (value != this.table[i][j] && value != this.table[j][posisi]) {
        this.cek.push(true)
      }
    }
    if (i < 3) {
      this.boxChecker(0,3,posisi, i, value)
    }else if(i < 6) {
      this.boxChecker(3,6,posisi, i, value)
    }else {
      this.boxChecker(6,9,posisi, i, value)
    }
    if (this.cek.length == 18) {
      return true;
    }else {
      return false;
    }
  }

  solve () {
    this.board();
    this.createObject();
    console.log('============BEFORE==============')
    for (let i = 0; i < 9; i++) {
      console.log(this.table[i].join(' | '))
    }
    console.log('=============AFTER==============')

    for (let i in this.obj) {
      for (let j in this.obj[i].posisi) {
        let posisi = this.obj[i].posisi[j];
        this.pos.push([i, this.obj[i].posisi[j]])
      }
    }
    let index = 0;
    while (index < this.pos.length) {
      let x = this.pos[index][0];
      let y = this.pos[index][1];
      let value = Number(this.table[x][y]) + 1;
      let found = false
      while(!found && value <= 9) {
        if(this.check(y, value, x)) {
          found = true;
          this.table[x][y] = value;
          index++
        }else {
          value++
        }
      }
      if(!found) {
        this.table[x][y] = 0;
        index--
      }
    }
    this.table.forEach(row => {
      console.log(row.join(' | '))
    });
  }   
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt').toString().split("\n")[1]
// var board_string = '369052478850674931714308265683927154597416820021835697138769042240583719905241306'
var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve();
