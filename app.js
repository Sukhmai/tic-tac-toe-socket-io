var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var players = ["X", "O"];
var game = [];
var playerNum = 0;
var turnNumber = 0;

app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket) {
  console.log('a user connected: ' + socket.id);

  socket.on('newPlayer', function() {
    socket.emit(players[playerNum])
    playerNum++;
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('turn', function(square, type) {
    if (type == "X" && turnNumber % 2 === 0 && game[square] === undefined) {
      game[square] = 1;
      io.emit('turn', square, type);
      turnNumber++;
    } else if (type == "O" && turnNumber % 2 == 1 && game[square] === undefined) {
      game[square] = -1;
      io.emit('turn', square, type);
      turnNumber++;
    }
    for (var i = 0; i < 3; i++) {
      if (game[0 + i * 3] + game[1 + i * 3] + game[2 + i * 3] === -3) {
        io.emit('win', "O");
      } else if (game[0 + i * 3] + game[1 + i * 3] + game[2 + i * 3] === 3) {
        io.emit('win', "X");
      }
    }
    for (var i = 0; i < 3; i++) {
      if (game[0 + i] + game[3 + i] + game[6 + i] === -3) {
        io.emit('win', "O");
      } else if (game[0 + i] + game[3 + i] + game[6 + i] === 3) {
        io.emit('win', "X");
      }
    }
    if (game[0] + game[4] + game[8] === 3) {
      io.emit('win', "X");
    } else if (game[0] + game[4] + game[8] === -3) {
      io.emit('win', "O");
    } else if (game[2] + game[4] + game[6] === 3) {
      io.emit('win', "X");
    } else if (game[2] + game[4] + game[6] === -3) {
      io.emit('win', "O");
    }
  });

  socket.on('restart', function() {
    game = [];
    turnNumber = 0;
    io.emit('restart');
  });

});
