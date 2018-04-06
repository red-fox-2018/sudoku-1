'use strict'

class Sudoku{
  static getTxtFile(){
    const fs = require('fs');
    var text = fs.readFileSync('./example.txt','utf8').split('\n')
    var sample = text[0]

    return sample
    // console.log(sample)
  }

  static board(){
    let papan = []
    let sample = Sudoku.getTxtFile()
    // console.log(sample)
    let urut = 0
    for(let i=0; i<9; i++){
      let baris = []
      for(let j=0; j<9; j++){
        baris.push(Number(sample[urut]))
        urut++
      }
      papan.push(baris)
    }
    // console.log(papan)
    return papan
  }

  static cekBaris(angka, baris){
    let papan = Sudoku.board()
    let cekBaris = papan[baris]
    // console.log(cekBaris)
    let hasilCek = cekBaris.indexOf(angka)
    if(hasilCek === -1){
      // console.log(true)
      return true
    }
    else {
      // console.log(false)
      return  false
    }
  }

  static cekKolom(angka, kolom){
    let arrKolom = []
    let papan = Sudoku.board()
    // console.log(papan)

    for(let i=0; i<papan.length; i++){
      // console.log(papan[i])
      let valueKolom = papan[i][kolom]
      arrKolom.push(valueKolom)
    }
    // console.log(arrKolom)
    let cekKolom = arrKolom.indexOf(angka)
    // console.log(cekKolom)
    if(cekKolom === -1){
      return true
      // console.log(true)
    }
    else {
      return false
      // console.log(false)
    }
  }

  static cekKotak(angka, koordinat){
    let arrKotak = []
    let papan = Sudoku.board()
    console.log(papan)

    // console.log(koordinat)
    // console.log(Math.floor(koordinat[0]/3)*3)
    // console.log(Math.floor(koordinat[1]/3)*3)
    let posisiX = Math.floor(koordinat[0]/3)*3
    let posisiY = Math.floor(koordinat[1]/3)*3
    console.log('koordinat:', posisiX, posisiY)

    for(let i=posisiX; i<posisiX+3; i++){
      for(let j=posisiY; j<posisiY+3; j++){
        // console.log(papan[i][j])
        arrKotak.push(papan[i][j])
      }
    }
    console.log(arrKotak)
    let cekKotak = arrKotak.indexOf(angka)
    // console.log(cekKolom)
    if(cekKotak === -1){
      return true
      // console.log(true)
    }
    else {
      return false
      // console.log(false)
    }
  }

  static getKoordinat0(){
    let papan = Sudoku.board()
    console.log(papan)

    let arrKoordinat0 = []
    for(let i=0; i<papan.length; i++){
      let baris = papan[i]
      // console.log(baris)
      for(let j=0; j<baris.length; j++){
        // console.log(baris[j])
        if(baris[j] === 0){
          // console.log('ini nol: ', i,j)
          arrKoordinat0.push([i,j])
        }
      }
      // arrKoordinat0.push(koordinat)
    }
    // console.log('masukin ke arrkoodinat: ',arrKoordinat0)
    return arrKoordinat0
  }

}


// Sudoku.getTxtFile()
// Sudoku.board()
// Sudoku.cekBaris(1, 0)
// Sudoku.cekKolom(7, 0)
// Sudoku.cekKotak(6,[7,3])
Sudoku.getKoordinat0()
