'use strict';

var express = require('express');
var User = require('../models/user');
var router = express.Router();

//fetch all users
router.route('/')
  .get(function (req, res) {
    User.forge()
    .fetchAll()
    .then(function (collection) {
      res.json({error: false, data: collection.toJSON()});
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })

module.exports = router;