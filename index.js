var db = require('./config/db')
var express = require('express')
var bodyParser = require('body-parser')
var app = express();
var port = process.env.PORT || 3000
var server = require('http').createServer(app);
var io = require("socket.io")(server);
var r_user = require('./routes/r_user')
var r_login = require('./routes/r_login')
var r_register = require('./routes/r_register')
app.set('port', port);

io.on('connection', function (socket) {
	socket.on('adduser', function(username){
    socket.username = username;
  })
  socket.on('chat', function(msg){
    socket.broadcast.to(socket.room).emit('chat-out',socket.username,msg)
  })  

  socket.on('switchRoom', function(newroom){
    socket.broadcast.to(socket.room).emit('chat-out', 'SERVER', socket.username+' has left this room');
    socket.leave(socket.room);
    socket.join(newroom);
    socket.emit('joinSalon', 'SERVER', 'you have connected to '+ newroom);
    socket.room = newroom;
    socket.broadcast.to(newroom).emit('chat-out', 'SERVER', socket.username+' has joined this room');
  });
})

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

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/user',r_user)
app.use('/login',r_login)
app.use('/register',r_register)

