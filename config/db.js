'use strict';
var mysql = require('mysql')
//Read | Select only connection
exports.db_r = function(){
  return  new mysql.createConnection({
  host : 'localhost',
  user     : 'dbChat_r',
  password : '?tacos$00123',
  database : 'db_chat'
})
}
//Write connection
exports.db_w = function(){
  return  new mysql.createConnection({
  host : 'localhost',
  user     : 'dbChat_w',
  password : 'GKBBpVGULiacwBB3',
  database : 'db_chat'
})
}
