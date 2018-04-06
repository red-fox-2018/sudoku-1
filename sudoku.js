var fs = require('fs');

require.extensions['.txt'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

var words = require("./example.txt").split('\n')[12];

class Sudoku {
  constructor() {
    this.board = this.boards();
  }

  boards () {
    let number = words;
    var arrSudoku = [];
      var arr = []
      for (var i = 0; i < number.length; i++) {
        arr.push(Number(Number(number[i])))
        if (arr.length == 9) {
          arrSudoku.push(arr);
          arr = []
        }
      }
    return arrSudoku;
  }

  // solve(board, value) {
  //   var board = this.board;
  //   var coordinateList = this.getCoordinate(board);
  //   for (var row = 0; row < board.length; row++) {
  //     for (var col = 0; col < board.length; col++) {
  //       if (board[row][col] == 0) {
  //         for (var value = 1; value <= 9; value++) {
  //           if (this.checkAll(board, row, col, value)) {
  //             board[row][col] = value;
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return board
  // }

  solve() {

    // var board = this.board;
    var coordinateList = this.getCoordinate(this.board);
    // console.log(coordinateList);
    let i = 0
    while (i < coordinateList.length) {
      var flag = false;
      var row = coordinateList[i][0];
      var col = coordinateList[i][1];
      var value = this.board[row][col]
      // for (var value = 1; value <= 9; value++) {
      while (!flag && value <= 9){
        if (this.checkAll(this.board, row, col, value)) {
          flag = true;
          this.board[row][col] = value;
          this.sleep(10)
          this.reset_board()
          console.log(this.board);
          // if (!this.checkAll(board, row, col, value)) {
          //   break;
          // }
          i++
        } else {
          value++
        }
      }

      if (!flag) {
        this.board[row][col] = 0
        i--;
        // break;
      }
    //   var value = board[row][col]
    //
    //   while (flag == false) {
    //     i--;
    //     if (this.checkAll(board, row, col, value)) {
    //       board[row][col] = value
    //       i++
    //     } else {
    //       value++;
    //     }
    //   }
    // }
  }
  return this.board
}

  getCoordinate(board) {
    var listCoordinate = [];
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        if (board[i][j] == 0) {
          listCoordinate.push([i, j]);
        }
      }
    }
    return listCoordinate;
  }

  checkRow(board, col, value) {
    for (var i = 0; i < board.length; i++) {
      if (board[i][col] == value) {
        return false;
      }
    }
    return true;
  }

  checkCol(board, row, value) {
    for (var i = 0; i < board.length; i++) {
      if (board[row][i] == value) {
        return false;
      }
    }
    return true;
  }

  checkBox(board, row, col, value) {
    // var y = Math.floor((i / 3)) * 3;
    // var x = Math.floor((j / 3)) * 3;
    // var dimensi = 3;
    //
    //
    // for (var i = x; i < x + 3; i++) {
    //   for (var j = y; j < y + 3; j++) {
    //     if (board[i][j] == value) {
    //       console.log(i, j);
    //       console.log(board[i][j]);
    //       return false;
    //     }
    //   }
    // }
    // return true;
    var y = Math.floor(row/3) * 3;
    var x = Math.floor(col/3) * 3;

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if(board[y + i][x + j] == value) {
          return false
        }
      }
    }
    return true;
  }

  checkAll(board, row, col, value) {
    if (this.checkRow(board, col, value) && this.checkCol(board, row, value) && this.checkBox(board, row, col, value)) {
      return true;
    }
    return false;
  }

 sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}
 reset_board() {
  console.log("\x1B[2J")
}
}

let sudoku = new Sudoku;
console.log('ini board ====>');
console.log(sudoku.boards());
console.log('\n');
console.log('ini board setelah solve ===>');
console.log(sudoku.solve());
