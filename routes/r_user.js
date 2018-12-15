'use strict';

var router = require('express').Router()
var checkAuth = require('../modules/feature_token')
var feature = require('../modules/features_user')
var user =

router.get("/:userID/salons",checkAuth,(req, res, next) => {
 res = feature.getUserSalons(req,res)
})
router.get("/:userID/friends",checkAuth,(req, res, next) => {
 res = feature.getUserFriends(req,res)
})
router.post("/friends/add",checkAuth, (req, res, next) => {
 res = feature.postFriend(req,res)
})
module.exports = router;
