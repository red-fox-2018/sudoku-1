/* 
- Solver hanya bisa menyelesaikan permasalahan sudoku lvl very easy hingga medium dengan 9 - 30 blank saja seperti pada beberapa test case dibawah
*/

class Sudoku{
    constructor(str){
        this.string = str;
        this.board = [];
        this.DummyBoard = [];
        this.number = '123456789';
        this.mark = [];  
    }

    count0(){
        let count = 0;
        for(let i=0;i<this.board.length;i++){
            for(let j=0;j<this.board[i].length;j++){
                if(this.board[i][j] ==='0' || this.board[i][j] === undefined){
                    count++;
                }
            }
        }
        return count;
    }
    sumWholeNumber(){
        let sum = 0;
        for(let i=0;i<this.board.length;i++){
            for(let j=0;j<this.board[i].length;j++){
                sum = sum + Number(this.board[i][j]);
            }
        }
        return sum;
    }

    boardgame(){
        let a=0;
        let b=8;
        for(let i=0;i<9;i++){
            this.board.push([])
            for(let j=a;j<=b;j++){
                this.board[i].push(this.string[j])
            }
            a+=9;
            b+=9;
        }
        this.DummyBoard = this.board;
        let blank = this.count0();
        let sum = this.sumWholeNumber();

        console.log('\n\n\n\n\n\n')
        console.log('Start With '+blank+' Blank..');
        console.log('Sum of The Whole Numbers = '+sum+'/405');
        console.log(this.board);
        console.log('===================================================');

        //while(blank>=1){
        this.checker();
        blank = this.count0();
        this.board = this.DummyBoard;
        //}

        sum = this.sumWholeNumber();
        if(blank === 0){
            console.log('SOLVED!!')
        }
        else{
            console.log(blank+' Blank Remains, Unsolved..')
        }
        console.log('Sum of The Whole Numbers = '+sum+'/405')
        return this.board;
    }

    checker(){
        for(let i=0;i<this.board.length;i++){
            for(let j=0;j<this.board[i].length;j++){
                this.mark = [];
                let number = 0;
                if(this.board[i][j] === '0'){
                    let check3x3 = this.checkfor3x3(i,j);
                    let vertical = this.verticalCheker(j);
                    let horizontal = this.horizontalCheker(i);                    
                    for(let k=0;k<vertical.length;k++){
                        for(let l=0;l<horizontal.length;l++){
                            if(vertical[k] === horizontal[l]){
                                for(let m=0;m<check3x3.length;m++){
                                    if(horizontal[l] === check3x3[m]){
                                        this.mark.push(vertical[k]);
                                    }
                                }
                            }
                        }
                    }
                    if(this.mark.length>1){
                        while(number === 0){
                            number = Math.floor(Math.random()*this.mark.length);
                        }
                        this.board[i][j] = this.mark[number];
                    }
                    else if(this.mark.length === 0){
                        this.board[i][j] = '0';
                    }
                    else{
                        this.board[i][j] = this.mark[number];
                    }
                }
            }
        }
        return this.board;
    }
    
    verticalCheker(y){
        let num = [];
        for(let i=0;i<this.number.length;i++){
            let count = 0;
            for(let j=0;j<9;j++){
                if(this.number[i]===this.board[j][y]){
                    count++;
                }
            }
            if(count === 0){
                num.push(this.number[i]);
            }
        }
        return num;
    }

    horizontalCheker(x){
        let num = [];
        for(let i=0;i<this.number.length;i++){
            let count = 0;
            for(let j=0;j<9;j++){
                if(this.number[i]===this.board[x][j]){
                    count++;
                }
            }
            if(count === 0){
               num.push(this.number[i]);
            }
        }
        return num;
    } 

    checkfor3x3(x,y){
        let num = [];
        if(x<3 && y<3){
            for(let i=0;i<this.number.length;i++){
                let count = 0;
                for(let j=0;j<3;j++){
                    for(let k=0;k<3;k++){
                        if(this.number[i] === this.board[j][k]){
                            count++;
                        }
                    }
                }
                if(count === 0){
                    num.push(this.number[i]);
                }
            }
        }
        else if(x<3 && (y>2 && y<6)){
            for(let i=0;i<this.number.length;i++){
                let count = 0;
                for(let j=0;j<3;j++){
                    for(let k=3;k<6;k++){
                        if(this.number[i] === this.board[j][k]){
                            count++;
                        }
                    }
                }
                if(count === 0){
                    num.push(this.number[i]);
                }
            }
        }
        else if(x<3 && (y>5 && y<9)){
            for(let i=0;i<this.number.length;i++){
                let count = 0;
                for(let j=0;j<3;j++){
                    for(let k=6;k<9;k++){
                        if(this.number[i] === this.board[j][k]){
                            count++;
                        }
                    }
                }
                if(count === 0){
                    num.push(this.number[i]);
                }
            }
        }
        else if((x>2 && x<6) && y<3){
            for(let i=0;i<this.number.length;i++){
                let count = 0;
                for(let j=3;j<6;j++){
                    for(let k=0;k<3;k++){
                        if(this.number[i] === this.board[j][k]){
                            count++;
                        }
                    }
                }
                if(count === 0){
                    num.push(this.number[i]);
                }
            }
        }
        else if((x>2 && x<6) && (y>2 && y<6)){
            for(let i=0;i<this.number.length;i++){
                let count = 0;
                for(let j=3;j<6;j++){
                    for(let k=3;k<6;k++){
                        if(this.number[i] === this.board[j][k]){
                            count++;
                        }
                    }
                }
                if(count === 0){
                    num.push(this.number[i]);
                }
            }
        }
        else if((x>2 && x<6) && (y>5 && y<9)){
            for(let i=0;i<this.number.length;i++){
                let count = 0;
                for(let j=3;j<6;j++){
                    for(let k=6;k<9;k++){
                        if(this.number[i] === this.board[j][k]){
                            count++;
                        }
                    }
                }
                if(count === 0){
                    num.push(this.number[i]);
                }
            }
        }
        else if((x>5 && x<9) && y<3){
            for(let i=0;i<this.number.length;i++){
                let count = 0;
                for(let j=6;j<9;j++){
                    for(let k=0;k<3;k++){
                        if(this.number[i] === this.board[j][k]){
                            count++;
                        }
                    }
                }
                if(count === 0){
                    num.push(this.number[i]);
                }
            }
        }
        else if((x>5 && x<9) && (y>2 && y<6)){
            for(let i=0;i<this.number.length;i++){
                let count = 0;
                for(let j=6;j<9;j++){
                    for(let k=3;k<6;k++){
                        if(this.number[i] === this.board[j][k]){
                            count++;
                        }
                    }
                }
                if(count === 0){
                    num.push(this.number[i]);
                }
            }
        }
        else if((x>5 && x<9) && (y>5 && y<9)){
            for(let i=0;i<this.number.length;i++){
                let count = 0;
                for(let j=6;j<9;j++){
                    for(let k=6;k<9;k++){
                        if(this.number[i] === this.board[j][k]){
                            count++;
                        }
                    }
                }
                if(count === 0){
                    num.push(this.number[i]);
                }
            }
        }
        return num;
    }
}

var str1 = '369052478850674931714308265683927154597416820021835697138769042240583719905241306';// solved <--- level test case very easy dengan 9 blank
var str2 = '105802000090076405200400819019007306762083090000061050007600030430020501600308900';// sisa 5 blank, unsolved..
var str3 = '300000000050703008000028070700000043000000000003904105400300800100040000968000200';// sisa 10-16 blank, unsolved..
var str4 = '302609005500730000000000900000940000000000109000057060008500006000000003019082040';// sisa 10-12 blank, unsolved..
var str5 = '000075400000000008080190000300001060000000034000068170204000603900000020530200000';// sisa 10-13 blank, unsolved..
var str6 = '005030081902850060600004050007402830349760005008300490150087002090000600026049503';// sisa 10-13 blank, unsolved..
var str7 = '105802000090076405200400819019007306762083090000061050007600030430020501600308900';// sisa 5 blank, unsolved..
var str8 = '005030081902850060600004050007402830349760005008300490150087002090000600026049503';// sisa 9-13 blank, unsolved..
var str9 = '290500007700000400004738012902003064800050070500067200309004005000080700087005109';// sisa 5-12 blank, unsolved..
var str10 = '080020000040500320020309046600090004000640501134050700360004002407230600000700450';// sisa 7-11 blank, unsolved..
var str11 = '369052478050674931714308265683027154507016820021835697130769042240583719905201306';// solved <--- level test case easy dengan 15 blank
var str12 = '069052478050674031714308260083020154507016820021835697130769042240503719905201306';// solved <--- level test case easy dengan 21 blank
var str13 = '069052478000674030014308260080020154507010820020830090130769042240503719905201306';// solved <--- level test case medium dengan 30 blank
var game = new Sudoku(str13);
console.log(game.boardgame());