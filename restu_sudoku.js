class Sudoku {
  constructor () {
    this.number = '105802000090076405200400819019007306762083090000061050007600030430020501600308900';
    this.guess = '123456789';
    this.board = [];
    this.boardMemory = []
  }
  generateBoard(row) {
    let board = [];
    let num = this.number;
    let indexInput = 0;
    // console.log(num[]);
    for (var i = 0; i < row; i++) {
      board[i] = [];
      for (var j = 0; j < row; j++) {
        if (num[indexInput] == 0) {
          board[i].push(' ');
        } else {
          board[i].push(num[indexInput])
        }
        indexInput++;
      }
    }
    return board
  }

  inputNumber(board) {
    let boardGame = board.map(function(arr){
      return arr.slice();
    });
    // console.log('---board-----\n', board);
    // console.log('----boardGame-----\n', boardGame);
    // // console.log('-----memory-----\n', memory);

    for (var i = 0; i < boardGame.length; i++) {
      for (var j = 0; j < boardGame[i].length; j++) {
          if (boardGame[i][j] === ' ') {
            // debugger;
            let cloneBoard = boardGame.map(function (arr) {
              return arr.slice();
            })
            memory.push(cloneBoard);
            // debugger;
            let guess = '123456789';
            for (var k = 0; k < 9; k++) {
              let idxGuess = Math.floor(Math.random() * guess.length);
              let guessChoice = guess[idxGuess];
              guess = guess.slice(0, idxGuess) + guess.slice(idxGuess + 1);
              if (!this.checkHorizontal(i, guessChoice, boardGame)) {
                if (!this.checkVertical(j, guessChoice, boardGame)) {
                  if (!this.checkGroup(i, j, guessChoice, boardGame)) {
                    boardGame[i][j] = guessChoice;
                    // debugger
                    break;
                  }
                }
              }
            }
          }
        
          // console.log('-----i && j------', i, j);
          // console.log('----boardGame------\n', boardGame);
        // debugger;
        // if (boardGame[i][j] == ' ') {
        //   debugger
        //   // console.log('----masuk recursive----');
        //   // console.log(board);
        //   // console.log('------\n');
        //   memory.pop();
        //   // memory.pop();
        //   return this.inputNumber(memory.pop());
        // }
      }
    }
    console.log('---board-----\n', board);
    console.log('----boardGame-----\n', boardGame);
    console.log('----memory----\n', memory);
  }


  checkHorizontal(index_i, guessNumber, board) {
    for (var j = 0; j < board.length; j++) {
      if (board[index_i][j] == guessNumber) {
        return true;
      }
    }
    return false;
  }

  checkVertical(index_j, guessNumber, board) {
    for (var i = 0; i < board.length; i++) {
      if (board[i][index_j] == guessNumber) {
        return true;
      }
    }
    return false;
  }

  checkGroup(index_i, index_j, guessNumber, board) {
    let selectedStr = '';
    if (index_i < 3 && index_j < 3) {
      let i = 0
      for (var j = 0; j < 3; j++) {
        selectedStr += board[i][j];
        selectedStr += board[i + 1][j];
        selectedStr += board[i + 2][j];
      }
    } else if (index_i < 3 && index_j < 6) {
      let i = 0
      for (var j = 3; j < 6; j++) {
        selectedStr += board[i][j];
        selectedStr += board[i + 1][j];
        selectedStr += board[i + 2][j];
      }
    } else if (index_i < 3 && index_j < 9) {
      let i = 0
      for (var j = 6; j < 9; j++) {
        selectedStr += board[i][j];
        selectedStr += board[i + 1][j];
        selectedStr += board[i + 2][j];
      }
    } else if (index_i < 6 && index_j < 3) {
      let i = 3
      for (var j = 0; j < 3; j++) {
        selectedStr += board[i][j];
        selectedStr += board[i + 1][j];
        selectedStr += board[i + 2][j];
      }
    } else if (index_i < 6 && index_j < 6) {
      let i = 3
      for (var j = 3; j < 6; j++) {
        selectedStr += board[i][j];
        selectedStr += board[i + 1][j];
        selectedStr += board[i + 2][j];
      }
    } else if (index_i < 6 && index_j < 9) {
      let i = 3
      for (var j = 6; j < 9; j++) {
        selectedStr += board[i][j];
        selectedStr += board[i + 1][j];
        selectedStr += board[i + 2][j];
      }
    } else if (index_i < 9 && index_j < 3) {
      let i = 6
      for (var j = 0; j < 3; j++) {
        selectedStr += board[i][j];
        selectedStr += board[i + 1][j];
        selectedStr += board[i + 2][j];
      }
    } else if (index_i < 9 && index_j < 6) {
      let i = 6
      for (var j = 3; j < 6; j++) {
        selectedStr += board[i][j];
        selectedStr += board[i + 1][j];
        selectedStr += board[i + 2][j];
      }
    } else if (index_i < 9 && index_j < 9) {
      let i = 6
      for (var j = 6; j < 9; j++) {
        selectedStr += board[i][j];
        selectedStr += board[i + 1][j];
        selectedStr += board[i + 2][j];
      }
    }
    for (var i = 0; i < selectedStr.length; i++) {
      if (guessNumber == selectedStr[i]) {
        return true;
      }
    }
    return false;
  }
}


var sudoku = new Sudoku();
var board = sudoku.generateBoard(9);
var memory = [[board]];
sudoku.inputNumber(board);
sudoku.checkHorizontal
// console.log(sudoku);
