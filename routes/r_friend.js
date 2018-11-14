'use strict';

var express = require('express');
var Friend = require('../models/friend');

var router = express.Router();
  router.route('/:id')
  .get(function(req, res) {
    Friend
    .where('id_user', req.params.id)
      .fetchAll()
      .then(function(friends) {
        res.json({ friends });
      });
  });

module.exports = router;