'use strict';

var router = require('express').Router()
var feature = require('../modules/features_user')

router.post("/", (req, res, next) => {
    res = feature.postRegister(req,res)
   })
module.exports = router