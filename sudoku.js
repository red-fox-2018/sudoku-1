


class Sudoku {
  constructor() {
    this.board = this.board(num)
    this.zero = this.zeroCoor()
  }

  board() {
    let sudokuBoard = []
    let counter = 0
    for (var i = 0; i < 9; i++) {
      let row = [];
      for (var j = 0; j < 9; j++) {
        row.push(Number(num[counter]))
        counter++
      }
      sudokuBoard.push(row)
    }
    return sudokuBoard
  }

  zeroCoor() {
    let arr = this.board
    let zeroPos = []
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr.length; j++) {
        if(arr[i][j]===0){
          zeroPos.push([i,j])
        }
      }
    }
    return zeroPos
  }
//==============================================
  checkRow(board,row,value){
    let arr = this.board
    for (var i = 0; i < board.length; i++) {
      let check = board[row].indexOf(value)
      if(check ==-1){
        return true
      }else{
        return false
      }
    }
  }
//=================================================
  checkCol(board,col,value){

    let arr = this.board
    let arrCol=[]

    for (var i = 0; i < board.length; i++) {
      arrCol.push(board[i][col])
    }

    let check = arrCol.indexOf(value)
    if(check ==-1){
      return true
    }else{
      return false
    }
  }
//======================================

  checkBox(board, row, col, num) {
    let boxOf3 = []
    let baris = Math.floor(row / 3) * 3;
    let kolom = Math.floor(col / 3) * 3;
    for (let i = baris; i < baris + 3; i++) {
      for (let j = kolom; j < kolom + 3; j++) {
        if (board[baris][kolom] == num) {
          boxOf3.push(board[baris][kolom])
        }
      }
    }
    if(boxOf3.indexOf(num)==-1){
      return true
    } else{
      return false
    }
  }
//===============================================


checkAll(board, row, col, num) {
  if (this.checkRow(board, row, num) && this.checkCol(board, col, num) && this.checkBox(board, row, col, num)) {
    return true;
  }
  return false;
}
//======================================================================

solve() {

  let i=0;
  let max = 9;
  while(i<this.zero.length){
    let baris = this.zero[i][0];
    let kolom = this.zero[i][1];
    let num = this.board[baris][kolom]+1;
    let status = false;
    while(!status && num<=max){
      if(this.checkAll(this.board,baris,kolom,num)){
        //this.reset_board()

        //console.log(this.board);
        //this.sleep(10)

        this.board[baris][kolom] = num;
        i++;
        status = true;
      } else {
        num++;
      }

    }
    if(!status){
      this.board[baris][kolom] = 0;
      i--;
    }
  }
  return this.board;
}
//==============================================================

 sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}
//================================================================
 reset_board() {
  console.log("\x1B[2J")
}



//========================================================
}//brecket tutup class


var fs = require('fs');
require.extensions['.txt'] = function(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};


[ [ 1, 0, 5, 8, 0, 2, 0, 0, 0 ],
  [ 0, 9, 0, 0, 7, 6, 4, 0, 5 ],
  [ 2, 0, 0, 4, 0, 0, 8, 1, 9 ],
  [ 0, 1, 9, 0, 0, 7, 3, 0, 6 ],
  [ 7, 6, 2, 0, 8, 3, 0, 9, 0 ],
  [ 0, 0, 0, 0, 6, 1, 0, 5, 0 ],
  [ 0, 0, 7, 6, 0, 0, 0, 3, 0 ],
  [ 4, 3, 0, 0, 2, 0, 5, 0, 1 ],
  [ 6, 0, 0, 3, 0, 8, 9, 0, 0 ] ]



var angka = require("./example.txt").split('\n');
var num = angka[angka.length-2]

let game = new Sudoku(num)
let test = new Sudoku(num)
//console.log(sudoku.zeroCoor());
// console.log(sudoku.board);
game.solve()

let str=''
for (let i = 0; i <9; i++) {
  for (let j = 0; j < 9; j++) {
    str+=test.board[i][j]
  }
}

let papan = [];
let brs = [];
for(let i=0; i<str.length; i++){

  if(i%9==0){
  if(i==27||i==54){
    papan.push(brs);
    brs = ['---------------------'];
  }
    //console.log('ini A ' + index,str[index]);
        papan.push(brs);
        brs = [];
        brs.push(Number(str[i]));
  } else if(i%3==0){
    brs.push('|');
    brs.push(Number(str[i]));
  }else{
    //console.log('ini B ' + index,str[index]);
    brs.push(Number(str[i]));
  }

}
papan.push(brs);
papan.shift();

console.log('unsolved');
console.log(papan.join('\n'));
console.log(`+++++++++++++++++++++++++++++++++++++++++++++++++`);
console.log(`+++++++++++++++++++++++++++++++++++++++++++++++++`);


let oneLine = '';
for (let i = 0; i <9; i++) {
  for (let j = 0; j < 9; j++) {
    oneLine+=game.board[i][j]
  }
}

let board = [];
let baris = [];
for(let i=0; i<oneLine.length; i++){

  if(i%9==0){
  if(i==27||i==54){
    board.push(baris);
    baris = ['---------------------'];
  }
    //console.log('ini A ' + index,str[index]);
        board.push(baris);
        baris = [];
        baris.push(Number(oneLine[i]));
  } else if(i%3==0){
    baris.push('|');
    baris.push(Number(oneLine[i]));
  }else{
    //console.log('ini B ' + index,str[index]);
    baris.push(Number(oneLine[i]));
  }

}
board.push(baris);
board.shift();

console.log('solved');
console.log(board.join('\n'));
