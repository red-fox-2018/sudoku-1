
class Sudoku {
  constructor(board_string) {
    this.num = board_string
  }

  solve() {
    let target = this.position0()
    let board = this.board()

    let max = 9;
    for(let i = 0; i < target.length;) {
      let row = target[i].row;
      let col = target[i].col;

      let value = board[row][col] + 1;

      let found = false;
      while(!found && value <= max) {
        if(this.checkRecheck(board, target[i], value)) {
          found = true;
          board[row][col] = value;
          i++;

        } else {
          value++;
        }
      }
      if(found == false) {
        board[row][col] = 0;
        i--;
      }
    }

    return board
  }

  position0() {
    let board = this.board()
    let arr0 = []

    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        if (board[row][col] == 0) {
          let obj = {
            value: board[row][col],
            row: row,
            col: col
          }
          arr0.push(obj)
        }
      }
    }
    return arr0
  }

  checkRecheck(board, target, num) {
    if (this.checkHorizontal(board, target, num) && this.checkVertical(board, target, num) && this.checkBlok(board, target, num)) {
      return true
    }
    return false
  }

  checkHorizontal(board, target, num) {
    for (let i = 0; i < board.length; i++) {
      if (board[target.row][i] == num) {
        return false
      }
    }
    return true
  }

  checkVertical(board, target, num) {
    for (let i = 0; i < board.length; i++) {
      if (board[i][target.col] == num) {
        return false
      }
    }
    return true
  }

  checkBlok(board, target, num) {
    for (let i = (target.row - (target.row % 3)); i < 3; i++) {
      for (let j = (target.col - (target.col % 3)); j < 3; j++) {
        if (board[i][j] == num) {
          return false
        }
      }
    }
    return true
  }

  board() {
    let num = this.num
    let length = 9

    let arr = []

    let counter = 0
    for (let i = 0; i < length; i++) {
      let isi = []
      for (let j = 0; j < length; j++) {
        isi.push(Number(num[(i * length) + j]))
      }
      arr.push(isi)
    }
    return arr
  }

}

let problem = '105802000090076405200400819019007306762083090000061050007600030430020501600308900'
let sudoku_solver = new Sudoku(problem)

console.log('BEFORE:')
console.log(sudoku_solver.board())
console.log('SOLVED:')
console.log(sudoku_solver.solve())
