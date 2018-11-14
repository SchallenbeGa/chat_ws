'use strict';

var express = require('./node_modules/express');
var bodyParser = require('./node_modules/body-parser');
var userRoute = require('./routes/r_user');
var friendRoute = require('./routes/r_friend');

var app = express();

var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user', userRoute);

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/friend', friendRoute);

app.listen(PORT, function() {
  console.log('server listening on port %s.', PORT);
});