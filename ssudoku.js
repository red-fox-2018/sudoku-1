function data(num) {
  var abjad = '003020600900305001001806400008102900700000008006708200002609500800203009005010300'
  var hasil = []
  var index = 0
  // var board=[]
  for (var i = 0; i < num; i++) {
    var board = []
    for (var j = 0; j < num; j++) {
      if (abjad[index] == 0) {
        board.push(' ')
      } else {
        board.push(abjad[index])
      }
      index++
    }
    hasil.push(board)
  }
  return hasil;
}
console.log(data(9));
