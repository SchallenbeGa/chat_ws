'use strict';
var bookshelf = require('../modules/bookshelf');
var User = bookshelf.Model.extend({
  tableName: 'tbl_users',
});
module.exports = User;