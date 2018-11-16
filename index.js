'use strict';

var express = require('./node_modules/express')
var bodyParser = require('./node_modules/body-parser')
//Routes functions
var user_log = require('./routes/r_user_log')
var user_list = require('./routes/r_user')
var salon = require('./routes/r_salon')

const checkAuth = require('./modules/check_auth')
var app = express()

app.use(bodyParser.urlencoded({ extended: true }));
//Routes
app.use('/', user_log)
//necessite token
app.use('/user', user_list)

app.use('/salon', salon)

module.exports = app;