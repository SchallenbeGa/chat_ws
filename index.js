var db = require('./config/db')
var express = require('express')
var app = express();
var port = process.env.PORT || 3000
var server = require('http').createServer(app);
var io = require("socket.io")(server);
var r_user = require('./routes/r_user')

app.set('port', port);



io.on('connection', function(socket){  
  socket.on('join', function (room,userID) {
    if(room!=null&&userID!=null){
    socket.join(room);
    console.log(room,userID)
    }
  });        
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

