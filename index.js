var db = require('./config/db')
var express = require('express')
var app = express();
var port = process.env.PORT || 3000
app.set('port', port);

var r_user = require('./routes/r_user')

db.connect(function(err) {
    if (err) {
      console.log('Unable to connect to MySQL.')
      process.exit(1)
    } else {
      app.listen(port, function() {
        console.log('Listening on port 3000...')
      })
    }
  })

app.use('/user',r_user)

