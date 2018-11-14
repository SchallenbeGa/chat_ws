'use strict';

var express = require('express');

var User = require('../models/user');

var router = express.Router();

router.route('/')
  .get(function(req, res) {
    User
      .fetchAll()
      .then(function(users) {
        res.json({ users });
      });
  });

  router.route('/:id')
  .get(function(req, res) {
    User
    .where('userID', req.params.id)
      .fetch()
      .then(function(users) {
        res.json({ users });
      });
  });

module.exports = router;