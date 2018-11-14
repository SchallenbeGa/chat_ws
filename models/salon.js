'use strict';
var bookshelf = require('../modules/bookshelf');
var Salon = bookshelf.Model.extend({
  tableName: 'tbl_salons',
});
module.exports = Salon;