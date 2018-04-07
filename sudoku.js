class  Sudoku { 
    constructor(string){ 
      this.string = string 
      this.board = [] 
    } 

    generateBoard(){ 
      var output = [[]] 
      var index = 0 
     
      for(var i=0;i<this.string.length;i++){ 
        if(output[index].length==9){ 
          index++ 
          output[index]=[] 
        } 
         
        if(parseInt(this.string.split('')[i])==0){ 
          output[index].push("o") 
        }else  
        output[index].push(parseInt(this.string.split('')[i]))         
      } 
      this.board = output 
      return this.board 
    } 

    printBoard(){ 
      return this.generateBoard() 
    } 


    checkVertical(num,column){ 
        for(var i=0;i<this.board.length;i++){ 
          if(parseInt(this.board[i][column])==num){ 
            return false 
          } 
        } 
        return true 
      } 

    checkHorizontal(num,row){ 
        for(var i=0;i<this.board.length;i++){ 
          if(parseInt(this.board[row][i])==num){ 
            return false 
          } 
        } 
        return true 
    } 

    checkGrid(num,cordinate){ 
        for(var i=cordinate[0]-3;i<cordinate[0];i++){ 
          for(var j=cordinate[1]-3;j<cordinate[1];j++){ 
            if(parseInt(this.board[i][j])==num){ 
              return false 
            } 
          } 
        } 
        return true 
      } 


      //checkNum, check everything if its present on grid,vertical or horizontal
      checkNum(row,column){ 
        var sectionrow = (row+1)%3==0? row+1:row+3-row%3 
        var sectioncolumn = (column+1)%3==0? column+1:column+3-column%3 
          for(var i=1;i<=9;i++){ 
            if(this.checkVertical(i,column)&&this.checkHorizontal(i,row)&&this.checkGrid(i,[sectionrow,sectioncolumn])){ 
              return i.toString() 
            } 
          } 
          return 'heh?' 
      }
     
      

      checkBoard(){ 
        for(var i=0;i<this.board.length;i++){ 
          for(var j=0;j<this.board.length;j++){ 
            if(typeof(this.board[i][j])=='string'){ 
              this.board[i][j] = this.checkNum(i,j) 
              var checking = true 
              while(checking){ 
                if(this.board[i][j]=='heh?'){ 
                  var lookforstring = true 
                  while(lookforstring){ 
                    this.board[i][j]='o' 
                    if(j==0){ 
                      j=this.board.length-1 
                      i-- 
                    }else{ 
                      j-- 
                    } 
                    if(typeof(this.board[i][j])=='string'){ 
                      lookforstring = false 
                      this.board[i][j]=this.backTrack(i,j); 
                      //console.log(this.board)
                      if(this.board[i][j]!=='heh?'){ 
                        checking = false 
                      } 
                    } 
                  } 
                }else{ 
                  checking = false 
                } 
              } 
            } 
          } 
        } 
        return this.convertAlltoNum() 
      } 


    backTrack(row,column){ 
      var oneBlock = this.board[row][column] 
      this.board[row][column] = 'o' 
      var array=[] 
      var sectionrow = (row+1)%3==0? row+1:row+3-row%3 
      var sectioncolumn = (column+1)%3==0? column+1:column+3-column%3 
      for(var i=1;i<=9;i++){ 
        if(this.checkVertical(i,column)&&this.checkHorizontal(i,row)&&this.checkGrid(i,[sectionrow,sectioncolumn])){ 
          array.push(i) 
        } 
      } 

      var convertedArray = array.length==1||array.indexOf(parseInt(oneBlock))==array.length-1||array.indexOf(parseInt(oneBlock))<0? 'heh?':array[array.indexOf(parseInt(oneBlock))+1] 
      //console.log(`row: ${row} column: ${column} array: ${array}`)
      //console.log(oneBlock)
      if(convertedArray==undefined){ 
        convertedArray = 'heh?' 
      } 

      return convertedArray.toString() 
    } 


    convertAlltoNum(){ 
      for(var i=0;i<this.board.length;i++){ 
        for(var j=0;j<this.board[i].length;j++){ 
          this.board[i][j]=parseInt(this.board[i][j]) 
        } 
      } 
      return this.board 
    } 
  } 

  var board1 = new Sudoku('105802000090076405200400819019007306762083090000061050007600030430020501600308900') 
  var board2 = new Sudoku('005030081902850060600004050007402830349760005008300490150087002090000600026049503') 
  var board3 = new Sudoku('105802000090076405200400819019007306762083090000061050007600030430020501600308900') 
  var board4 = new Sudoku('005030081902850060600004050007402830349760005008300490150087002090000600026049503') 
  var board5 = new Sudoku('290500007700000400004738012902003064800050070500067200309004005000080700087005109') 
  var board6 = new Sudoku('080020000040500320020309046600090004000640501134050700360004002407230600000700450') 
  var board7 = new Sudoku('608730000200000460000064820080005701900618004031000080860200039050000100100456200') 
  var board8 = new Sudoku('370000001000700005408061090000010000050090460086002030000000000694005203800149500') 
  var board9 = new Sudoku('000689100800000029150000008403000050200005000090240801084700910500000060060410000') 
  var board10 = new Sudoku('030500804504200010008009000790806103000005400050000007800000702000704600610300500') 
  var board11 = new Sudoku('096040001100060004504810390007950043030080000405023018010630059059070830003590007') 
  var board12 = new Sudoku('000075400000000008080190000300001060000000034000068170204000603900000020530200000') 
  var board13 = new Sudoku('300000000050703008000028070700000043000000000003904105400300800100040000968000200') 
  var board14 = new Sudoku('302609005500730000000000900000940000000000109000057060008500006000000003019082040') 
  var board15 = new Sudoku('000000000000000000000000000000000000000000000000000000000000000000000000000000000')
  board15.printBoard()
  console.log(board15.checkBoard())
