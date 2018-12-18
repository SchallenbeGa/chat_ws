'use strict';
//todo: ne pas publier apres modif.
const { Client } = require('pg')
const connectionString = 'postgres://yadkbpnwofehrd:ce304ac4ce4916589f46877f2aec33cbec6a108aaeddbffe87ab5fca4daefdee@ec2-23-21-65-173.compute-1.amazonaws.com:5432/d5bcgpklbc81vv';
exports.db_w = function(){return  new Client({
  connectionString: connectionString,
  ssl: true
})
}