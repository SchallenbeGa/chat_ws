'use strict';
var mysql = require('mysql')

//Read only connection
exports.db_r = function(){
  return  new mysql.createConnection({
  host : 'localhost',
  user     : 'dbChat_r',
  password : '?tacos$00123',
  database : 'db_chat'
});
}
