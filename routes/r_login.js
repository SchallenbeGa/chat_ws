'use strict';

var express = require('express');
var router = express.Router();

var feature = require('../modules/features_user')

router.post("/", (req, res, next) => {
    res = feature.postLogin(req,res)
   })
module.exports = router;