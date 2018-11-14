'use strict';
var knex = require('../node_modules/knex')(require('../config/knexfile'));
var bookshelf = require('../node_modules/bookshelf')(knex);

module.exports = bookshelf;