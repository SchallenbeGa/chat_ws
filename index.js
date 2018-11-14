'use strict';

var express = require('./node_modules/express')
var bodyParser = require('./node_modules/body-parser')
var jwt = require('jsonwebtoken')
var secret = require('./config/secret')
var user_log = require('./routes/r_user_log')
//var salon_log = require('./routes/r_salon_log')

var app = express()
app.set('superSecret',secret.secret);

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', user_log)
//app.use('/salon', salon_log)

module.exports = app;