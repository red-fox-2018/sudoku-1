class Sudoku {
  constructor(string) {
    this.string = string
    this.board = this.tempBoard()
  }

  tempBoard(){
    let stringNum = this.string
    let limit = 9
    let mainBoard=[]
    let arrRow=[]
    for(let i=0; i<stringNum.length; i++){
      arrRow.push(Number(stringNum.charAt(i)))
      limit--
      if(limit == 0){
        mainBoard.push(arrRow)
        arrRow=[]
        limit = 9
      }
    }
    return mainBoard
  }

  findZeroIndex(){
    let board = this.board
    let arrZeroIndex=[]
    for(let i=0; i<9; i++){
      for(let j=0; j<9; j++){
        if(board[i][j] == 0){
          let objIdx={row: i, col: j}
          arrZeroIndex.push(objIdx)
        }
      }
    }
    return arrZeroIndex
  }

  checkRow(currValue, rowIdx, board){
    for(let col=0; col<9; col++){
      if(board[rowIdx][col] === currValue){
        return false
      }
    }
    return true
  }
  checkCol(currValue, colIdx, board){
    for(let row=0; row<9; row++){
      if(board[row][colIdx] === currValue){
        return false
      }
    }
    return true
  }

  checkBlock(currValue, rowIdx, colIdx, board){
    let row = Math.floor(rowIdx/3) * 3
    let col = Math.floor(colIdx/3) * 3

    for(let i=0; i<3; i++){
      for(let j=0; j<3; j++){
        if(board[row + i][col + j] === currValue){
          return false
        }
      }
    }
    return true
  }

  checkConflict(currValue, rowIdx, colIdx, board){
    if(this.checkRow(currValue, rowIdx, board) && this.checkCol(currValue, colIdx, board) && this.checkBlock(currValue, rowIdx, colIdx, board)){
      return true
    }
    return false
  }

  solve(){
    let arrZeroIdx = this.findZeroIndex()
    let board = this.board
    let limit = 9

    for(let i=0; i<arrZeroIdx.length; i++){
      let valueNum = board[arrZeroIdx[i].row][arrZeroIdx[i].col]
      let unique = this.checkConflict(valueNum, arrZeroIdx[i].row, arrZeroIdx[i].col, board)

      while(!unique){
        valueNum++

        if(valueNum > limit){
          break;
        }
        unique = this.checkConflict(valueNum, arrZeroIdx[i].row, arrZeroIdx[i].col, board)
      }

      if(unique){
        board[arrZeroIdx[i].row][arrZeroIdx[i].col] = valueNum
      }else{
        board[arrZeroIdx[i].row][arrZeroIdx[i].col] = 0
        i = i - 2
      }
    }
  }

}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('example.txt')
  .toString()
  .split("\n")[0]

var sudoku = new Sudoku(board_string)
// console.log(sudoku.);
sudoku.solve()
console.log(sudoku.board);
