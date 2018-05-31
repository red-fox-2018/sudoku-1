const fs = require('fs');
const test = fs.readFileSync('./example.txt', "utf8");

const str_board = test.split('\n')[0]

class Sudoku {
  constructor(str) {

    this.board = this.generateBoard(str) ;
    this.zero = this.checkZero(this.board)

  }

  solve(){

    const board = this.board
    const empty = this.zero

    for (var i = 0; i < empty.length; i++) {

      let row = empty[i][0]
      let col = empty[i][1]

      if (board[row][col] == 0) {

        for (var j = 1; j <= board.length; j++) {

          if (this.checkAll(row, col, j)) {

            board[row][col] = j

            this.sleep(500)
            this.reset_board()

            console.log(board);

            let track = this.solve()

            if (track) {

              return true;

            } else {

              board[row][col] = 0

            }

          }

        }

        return false

      }

    }

    return `solved`

  }


  checkAll(row, column, num){

    if (this.checkArea(row, column, num)) {

      if (this.checkRow(row, num)) {

        if (this.checkColumn(column, num)) {

          return true

        }

      }

    }

    return false

  }

  checkArea(row, column, num){

    const board = this.board
    const rowArea = Math.floor(row/3) * 3
    const columnArea = Math.floor(column/3) * 3

    for (var i = 0; i < 3; i++) {

      for (var j = 0; j < 3; j++) {

        if (board[rowArea+i][columnArea+j] == num) {

          return false

        }

      }

    }

    return true

  }

  checkColumn(col, num){

    const board = this.board
    const arr = []

    for (var i = 0; i < 9; i++) {

      for (var j = col; j < col+9; j+=9) {

        arr.push(+(board[i][j]))

      }

    }

    if (arr.indexOf(num) != -1) {

      return false

    } else {

      return true

    }

  }

  checkRow(row, num){

    const board = this.board

    if (board[row].indexOf(num) == -1) {

      return true

    } else {

      return false

    }

  }

  checkZero(newBoard){

    const board = newBoard
    const zeroCoordinate = []

    for (var i = 0; i < board.length; i++) {

      for (var j = 0; j < board.length; j++) {

        let temp = []

        if (board[i][j] == 0) {

          temp.push(i)
          temp.push(j)
          zeroCoordinate.push(temp)

        }

      }

    }

    return zeroCoordinate

  }

  generateBoard(str){

    const board = []
    let row = []
    let count = 0

    for (var i = 0; i < 9; i++) {

      for (var j = 0; j < 9; j++) {

        row.push(+(str[count]))
        count ++

      }

      board.push(row)
      row = []

    }

    return board

  }

  sleep (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

  reset_board () {
    console.log("\x1B[2J")
  }

}

/*
[ [ 1, 0, 5, 8, 0, 2, 0, 0, 0 ],
  [ 0, 9, 0, 0, 7, 6, 4, 0, 5 ],
  [ 2, 0, 0, 4, 0, 0, 8, 1, 9 ],
  [ 0, 1, 9, 0, 0, 7, 3, 0, 6 ],
  [ 7, 6, 2, 0, 8, 3, 0, 9, 0 ],
  [ 0, 0, 0, 0, 6, 1, 0, 5, 0 ],
  [ 0, 0, 7, 6, 0, 0, 0, 3, 0 ],
  [ 4, 3, 0, 0, 2, 0, 5, 0, 1 ],
  [ 6, 0, 0, 3, 0, 8, 9, 0, 0 ] ]
*/

let newSudoku = new Sudoku(str_board)

// console.log(newSudoku.generateBoard(str_board));

console.log(newSudoku.solve());
// console.log(Sudoku.checkArea(0, 1, 3));

// console.log(Sudoku.checkZero());
// console.log(Sudoku.checkRow(str_board));
// console.log(Sudoku.checkColumn(1, 2));
