
/*
@ Iswanul Umam - Red Fox



- Solution improvement using check each row, column, block + recursion backtracking
*/

// ----------------------- class sudoku solver ----------------------------

class Sudoku {
  constructor(input) {
    this.input = input;
    this.board = [];
  }
  /**
   * Function generateBoard().
   *
   * Generate board from string input
   *
   * @return {Void}
   */
  generateBoard() {
    if (this.input == undefined) {
      console.log(`Input string is not valid!`);
      return;
    }
    for (let i = 0; i < 81; i += 9) {
      let row  = this.input.slice(i, i + 9).split('');
      this.board.push(row);
    }
  }
  /**
   * Function getBoard().
   *
   * getting value of board
   *
   * @return {Board}
   */
  getBoard() {
    return this.board;
  }
  /**
   * Function solve().
   *
   * call main function
   *
   * @return {Void}
   */
  solve() {
    this.main(this.board);
  }
  /**
   * Function main().
   *
   * fill empty board with recursion backtracking
   *
   * @return {Void}
   */
  main(board) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        // console.log('main called');

        if (board[i][j] == '0') {
          // fill board with value 1 until 9
          for (let c = '1'; c <= '9'; c++) {
            // console.log('called');
            if (
              (this.isValidRow(board, j, c)) &&
              (this.isValidColumn(board, i, c)) &&
              this.isValidBlock(board, i, j, c)
            ) {
              board[i][j] = c.toString();
              if (this.main(board)) return true; // valid value
              else board[i][j] = '0'; // value is not valid, then back to 0
            }
          }
          return false;
        }

      }
    }
    // true solution
    return true;
  }
  /**
   * Function isValidRow().
   *
   * checking valid value in row, 
   * @param {Array} board - sudoku board
   * @param {Integer} col - column checked
   * @param {Integer/Char} c - value 1 to 9
   *
   * @return {bolean} true or false
   */
  isValidRow(board, col, c) {
    // horizontal check
    for (let i = 0; i < 9; i++) {
      if ((board[i][col] != '0') && (board[i][col] == c)) {
        return false;
      }
    }
    return true;
  }
  /**
   * Function isValidColumn().
   *
   * checking valid value in column
   * @param {Array} board - sudoku board
   * @param {Integer} row - row checked
   * @param {Integer/Char} c - value 1 to 9
   *
   * @return {bolean} true or false
   */
  isValidColumn(board, row, c) {
    // vertical check
    for (let i = 0; i < 9; i++) {
      if ((board[row][i] != '0') && (board[row][i] == c)) {
        return false;
      }
    }
    return true;
  }
  /**
   * Function isValidBlock().
   *
   * checking valid value in block
   * @param {Array} board - sudoku board
   * @param {Integer} row - row checked
   * @param {Integer} col - row checked
   * @param {Integer/Char} c - value 1 to 9
   *
   * @return {bolean} true or false
   */
  isValidBlock(board, row, col, c) {
    // block check
    for (let i = 0; i < 9; i++) {
      if ((board[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + i % 3] != '0') &&
          (board[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + i % 3] == c)) {
        return false; // block check
      }
    }
    return true;
  }
}

// -------------------- Sudoku Checker ----------------------------------

class SudokuChecker {
  constructor(input) {
    this.board = input;
  }
  isValid(input) {
    for (let row of input) {
      let sorted = row.sort((a, b) => a - b).join('');
      if (sorted != '123456789') {
        return false;
      }
    }
    return true;
  }
  check() {
    if (this.board.length != 9) return `Board is not valid`;
    let column = [];
    let block = [];
    for (let i = 0; i < 9; i++) {
      column[i] = [];
      for (let j = 0; j < 9; j++) {
        let k = Math.floor(i / 3) + Math.floor(j / 3) * 3;
        block[k] = block[k] || [];
        block[k].push(this.board[i][j]);
        column[i].push(this.board[j][i]);
      }
    }
    let allValid = this.isValid(this.board) && this.isValid(column) && this.isValid(block);
    return allValid ? `True solution!` : `False solution!`;
  }
}

// ----------------------------------------------------------

// driver code sampel 1
const fs = require('fs');
let input = fs.readFileSync('set-02_project-euler_50-easy-puzzles.txt', 'utf8');
let line = input.split('\n')[1]; // change index to use other test case

let sudoku = new Sudoku(line);


// # generate
sudoku.generateBoard();
console.log('# Original board');
console.log(sudoku.getBoard());

// # solve
sudoku.solve();
console.log('# After solved');
console.log(sudoku.getBoard());

// # check
let sudokuCheck = new SudokuChecker(sudoku.getBoard());
console.log(`# Check it is true/false solution:`);
console.log(sudokuCheck.check());