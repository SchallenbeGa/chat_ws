'use strict';

var express = require('express');
var router = express.Router();

var feature = require('../modules/features_user')

router.get("/:userID/salons", (req, res, next) => {
 res = feature.getUserSalons(req,res)
})
router.get("/:userID/friends", (req, res, next) => {
 res = feature.getUserFriends(req,res)
})
router.post("/friends/add", (req, res, next) => {
 res = feature.postFriend(req,res)
})
module.exports = router;