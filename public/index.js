var socket = io();

var type = '';

socket.emit('newPlayer');

socket.on('X', function() {
  type = "X";
  console.log(type);
});

socket.on('O', function() {
  type = "O";
  console.log(type);
});

socket.on('win', function(type) {
  window.alert(type + " won!")
})

socket.on('turn', function(square, otherType) {
  console.log(square);
  var box = document.getElementsByClassName('square')[square];
  box.innerHTML = otherType;
})

socket.on('restart', function() {
  for (var i = 0; i < 9; i++) {
    var box = document.getElementsByClassName('square')[i];
    box.innerHTML = "";
  }
})

function clickSquare(square) {
  socket.emit('turn', square, type);
}

function restart() {
  socket.emit('restart');
}
