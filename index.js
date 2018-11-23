var db = require('./config/db')
var express = require('express')
var app = express();
var port = process.env.PORT || 3000
var server = require('http').createServer(app);
var io = require("socket.io")(server);
var r_user = require('./routes/r_user')

app.set('port', port);

io.on('connection', function (socket) {
	socket.on('adduser', function(username){
    socket.username = username;
    console.log(username);
  })
})

io.on('switchRoom', function(newroom){
  socket.leave(socket.room);
  socket.join(newroom);
  socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
  // sent message to OLD room
  socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
  // update socket session room title
  socket.room = newroom;
  socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
  socket.emit('updaterooms', rooms, newroom);
});

db.connect(function(err) {
    if (err) {
      console.log('Unable to connect to MySQL.')
      process.exit(1)
    } else {
      server.listen(port, function() {
        console.log('Listening on port 3000...')
      })
    }
  })


app.use('/user',r_user)

