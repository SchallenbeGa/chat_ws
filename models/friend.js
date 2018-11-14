'use strict';
var bookshelf = require('../modules/bookshelf');
var Friend = bookshelf.Model.extend({
  tableName: 'tbl_user_friend',
});
module.exports = Friend;