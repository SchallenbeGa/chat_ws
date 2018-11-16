'use strict';
var bookshelf = require('../modules/bookshelf')
var Friend = require('./friend')
var User = bookshelf.Model.extend({
  tableName: 'tbl_users',
  friends: function() {
    return this.hasMany(Friend);
  }
})
module.exports = User;