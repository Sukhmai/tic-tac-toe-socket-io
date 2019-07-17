var socket = io();

var tictactoe = [" "," "," "," "," "," "," "," "," "];

socket.on('clicked', function() {
  popup.style.display = "inline-block";
})

var click = document.getElementById('click');
var popup = document.getElementById('popup')
click.onclick = function(){
  popup.style.display = "inline-block";
  socket.emit('clicked');
}
