class sudoku {
    constructor(str) {
        this.list_num = str.split('')
        this.board = []
        this.memory = []
        this.count = 0
        this.num = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    }

    generateBoard() {
        for (let i = 0; i < 9; i++) {
            var nestedArr = []
            for (let j = 0; j < 9; j++) {
                nestedArr.push(this.list_num[this.count])
                this.count++
            }
            this.board.push(nestedArr)
        }
        return this.board
    }

    solve(status) {
        var done = false
        while (done == false) {
            var status = true
            for (let i = 0; i < this.board.length; i++) {
                for (let j = 0; j < this.board[i].length; j++) {
                    if (this.board[i][j] == 0) {
                        var filledNum = []
                        var possibility = []
                        var horizontal = this.checkHorizontal(filledNum, this.board[i], j)
                        var vertical = this.checkVertical(filledNum, this.board, j, i)
                        var box = this.checkBox(filledNum, this.board, i, j)
                        var unique = this.lookingUnique(filledNum, possibility) 
                        if (possibility.length == 1) {
                            this.board[i][j] = possibility[0]
                            status = false
                        }
                        console.log(this.printBoard(this.board))
                        this.sleep(200)
                        this.reset_board()
                    }
                }
            }
            if (status == true) {
                done = true
            }
        }   
        return this.printBoard(this.board)    
    }
      
    checkHorizontal(filledNum, numHorizontal, row) {
        for (let i = 0; i < numHorizontal.length; i++) {
            if (numHorizontal[i] != 0) {
                filledNum.push(numHorizontal[i])
            }

        }
    }

    checkVertical(filledNum, numVertical, col, row) {
        for (let i = 0; i < this.num.length; i++) {
            if (numVertical[i][col] != 0) {
                filledNum.push(numVertical[i][col])
            }
        }
    }

    checkBox(filledNum, numBox, row, col) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (row < 3) {
                    if (col < 3) {
                        filledNum.push(numBox[i][j])
                    }
                    else if (col >= 3 && col < 6) {
                        filledNum.push(numBox[i][j + 3])
                    }
                    else if (col >= 6 && col < 9) {
                        filledNum.push(numBox[i][j + 6])
                    }
                }
                else if (row >= 3 && row < 6) {
                    if (col < 3) {
                        filledNum.push(numBox[i + 3][j])
                    }
                    else if (col >= 3 && col < 6) {
                        filledNum.push(numBox[i + 3][j + 3])
                    }
                    else if (col >= 6 && col < 9) {
                        filledNum.push(numBox[i + 3][j + 6])
                    }
                }
                else if (row >= 6 && row < 9) {
                    if (col < 3) {
                        filledNum.push(numBox[i + 6][j])
                    }
                    else if (col >= 3 && col < 6) {
                        filledNum.push(numBox[i + 6][j + 3])
                    }
                    else if (col >= 6 && col < 9) {
                        filledNum.push(numBox[i + 6][j + 6])
                    }
                }
            }
        }
    }

    lookingUnique(array,possibility) {
        for (let i = 0; i < this.num.length; i++) {
            if (array.indexOf(this.num[i]) == -1) {
                possibility.push(this.num[i])
            }
        }
    }

    printBoard(board){
        var result = ''
        for(let i=0;i<board.length;i++){
            var str = ''
            if(i==0){
                result += ' ------- ------- -------' + '\n'
            }
            for(let j=0;j<board[i].length;j++){
                if(j==0){
                    str += '| '
                }
                if(j==2 || j==5 || j==8){
                    str += board[i][j] + ' | '
                }
                else{
                    str += board[i][j] + ' '
                }
                
            }
            if (i == 2 || i == 5 || i == 8){
                result += str
                result += '\n'
                result += ' ------- ------- -------' +'\n'
            }
            else{
                result += str
                result += '\n'
            }  
        }
        return result
    }

    reset_board() {
    console.log("\x1B[2J")
    }

    sleep (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}
}

var fs = require('fs')
var str = fs.readFileSync('example.txt').toString().split('\n')[7]
var game = new sudoku(str)
game.generateBoard()
console.log(game.solve())
