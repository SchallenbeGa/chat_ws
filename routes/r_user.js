'use strict';

var express = require('express');
var User = require('../models/user');
var Friend = require('../models/friend');
var router = express.Router();

const checkAuth = require("../modules/check_auth");

router.get("/", checkAuth, (req, res, next) => {
 User.fetchAll().then(result => {
   res.status(200).json({ message: result });
 });
});



router.post("/friends", (req, res, next) => {
  if(req.body.userName==null || req.body.userName == ""){
    res.status(500).json({error: true, data: {message: "missing username"}});
  }else{
  User.where('userName', req.body.userName)
  .fetch({withRelated:['friends.users']}).then(function(m) {
    console.log(m)
    res.status(200).json({ message: m.related('friends') });
  });
 }});

router.delete("/delete", checkAuth, (req, res, next) => {
  User.where('userName', req.body.userName)
  .destroy()
  .then(function() {
    res.status(200).json({error: false, data: {message: "success"}});
  }).catch(function(err){
    res.status(500).json({error: true, data: {message: err.message}});
  })})

module.exports = router;