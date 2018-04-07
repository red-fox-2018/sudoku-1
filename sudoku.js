"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardSudoku = board_string;
  }

  solve() {
    let boardSudoku = this.board();
    let emptyObject = {};

    for(let i=0;i<boardSudoku.length;i++){
      for(let j=0;j<boardSudoku[i].length;j++){

        if(boardSudoku[i][j] == '0'){
          emptyObject[i+''+j] = '0';
        }
      }
    }

    for(let i=0;i<boardSudoku.length;i++){

      //Untuk mengisi angka
      let j=0;
      while(j<boardSudoku.length){

        //Check Number apakah angka unique apa tidak
        let checkUnique = false;
        var kordinatX = i;
        var kordinatY = j;
        var inputNum = 1;

        if(boardSudoku[i][j] == '0'){

          if(checkBackTracking == true){
            inputNum = parseInt(emptyObject[i+''+j])+1;
          }
          while(checkUnique ==false){
            checkUnique = false;

            if(inputNum>9){
              inputNum=1;
              var checkBackTracking = false;
              break;
            }

            let horizontalValidation = this.horizontalCheck(boardSudoku,kordinatX,inputNum);
            let verticalValidation = this.verticalCheck(boardSudoku,kordinatY,inputNum);
            let squareValidation = this.squareCheck(boardSudoku,kordinatX,kordinatY,inputNum)

            if(squareValidation == true && verticalValidation == true && horizontalValidation==true ){
              checkUnique = true;
            }

            inputNum++;
          }

          inputNum--;
          boardSudoku[i][j] = inputNum.toString();
          emptyObject[i+''+j] = (boardSudoku[i][j]);
        }
        //Deteksi object terdekat
        while(checkBackTracking==false){

          if(j==0){
            j=9;
            i=i-1;
          }
          j=j-1;

          if(emptyObject[i+''+j] != undefined){
            checkBackTracking=true;
            boardSudoku[i][j] = '0';
            j=j-1;
          }
        }
        j++;
      }
    }

    console.log(boardSudoku);

  }

  // Returns a string representing the current state of the board
  board() {
    let displaySudoku = [];
    let soalSudoku = this.boardSudoku;
    //console.log(soalSudoku);

    for(let i=0;i<9;i++){
      displaySudoku.push([]);
      for(let j=0;j<9;j++){
        displaySudoku[i].push(soalSudoku[j]);
        var count = j;
      }
      let soalSudokuBaru = soalSudoku.substr(count+1);
      soalSudoku = soalSudokuBaru;
    }
    return displaySudoku;
  }

  horizontalCheck(boardSudoku,kordinatX,inputNum){

    for(let i=0;i<boardSudoku.length;i++){
      let inputString = inputNum.toString();
      if(boardSudoku[kordinatX][i] == inputString){
        return false;
      }
    }
    return true;
  }

  verticalCheck(boardSudoku,kordinatY,inputNum){

    for(let i=0;i<boardSudoku.length;i++){
      let inputString = inputNum.toString();
      if(boardSudoku[i][kordinatY] == inputString){
        return false;
      }
    }
    return true;
  }

  squareCheck(boardSudoku,kordinatX,kordinatY,inputNum){

    let backX = 0;
    let backY=0;

    if(kordinatX>=3 && kordinatX <=5){
      backX = 3;
    }
    else if (kordinatX>5) {
      backX = 6;
    }

    if(kordinatY>=3 && kordinatY <=5){
      backY = 3;
    }
    else if (kordinatY>5) {
      backY = 6
    }


    for(let i=backX;i<backX+3;i++){
      for(let j=backY;j<backY+3;j++){
        let inputString = inputNum.toString();
        if(boardSudoku[i][j] == inputString){
          return false;
        }
      }
    }
    return true;
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0];

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()

//console.log(game.board())
