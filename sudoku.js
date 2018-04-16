class Sudoku {
  constructor(board) {
    this.string = board;
    this.solving = this.unsolved();
  }

  isi(table, row, col, fillRowColumn) {
    for (let newLine=0;newLine<9;newLine++) {
      if (newLine !== row && table[newLine][col] === fillRowColumn) {
        return false;
      }
    }

    for (let newCol=0;newCol<9;newCol++) {
      if (newCol !== col && table[row][newCol] === fillRowColumn) {
        return false;
      }
    }

    let y = Math.floor((row / 3)) * 3;
    let x = Math.floor((col / 3)) * 3;

    for (let cekRow=0;cekRow<3;cekRow++) {
      for (let cekCol=0;cekCol<3;cekCol++) {
        if (cekRow !== row && cekCol !== col && table[y + cekRow][x + cekCol] === fillRowColumn) {
          return false;
        }
      }
    }
    return true;
  }

  checkSolve() {
    this.solve(this.solving);
  }

  solve(table) {
    for (let row=0;row<9;row++) {
      for (let col=0;col<9;col++) {

        if (table[row][col]!== 0) {
          continue;
        }

        for (let fillRowColumn = 1; fillRowColumn <= 9; fillRowColumn++) {

          if (this.isi(table, row, col, fillRowColumn) === true) {
            table[row][col] = fillRowColumn;
            let cekRowColumn = this.solve(table);

            if (cekRowColumn === true) {
              return true;
            }

            table[row][col] = 0;
          }
        }

        return false;
      }
    }

    return true;
  }

  board() {
    let pattern = this.unsolved();
    for (let i=0;i<9;i++) {
      this.solving[i] = this.solving[i].join(" ");
    }
    console.log(this.solving.join("\n"));
  }

  unsolved() {
    let unsolvedBoard = [];

    for (let i=0;i<this.string.length;i+=9) {
      let tampung = [];
      for (let j=i;j<i+9;j++) {
        tampung.push(+this.string[j]);
      }
      unsolvedBoard.push(tampung);
    }
    return unsolvedBoard;
  }

}

var fs = require('fs');
var board = fs.readFileSync('example.txt','utf-8').split("\n")[0];
var game = new Sudoku(board);

game.checkSolve();
game.board();