var socket = io();

var game = [" "," "," "," "," "," "," "," "," "];

var turnNumber = 0;

var players = ["X", "O"];

socket.on('clicked', function() {
  popup.style.display = "inline-block";
})

socket.on('turn', function(square) {
  console.log(square);
  var box = document.getElementsByClassName('square')[square];
  box.innerHTML = "X";
})

var click = document.getElementById('click');
var popup = document.getElementById('popup')
click.onclick = function(){
  popup.style.display = "inline-block";
  socket.emit('clicked');
}

function clickSquare(square) {
  var box = document.getElementsByClassName('square')[square];
  box.innerHTML = "X";
  socket.emit('turn', square);
}
