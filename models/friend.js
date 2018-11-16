'use strict';
var bookshelf = require('../modules/bookshelf');
var User = require('./user')
var Friend = bookshelf.Model.extend({
  tableName: 'tbl_users',
  users: function() {
    return this.belongsToMany(User);
  }
});
module.exports = Friend;
