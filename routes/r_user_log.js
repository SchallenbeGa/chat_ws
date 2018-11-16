'use strict';

var express = require('express');
var User = require('../models/user');
var router = express.Router();
var secret = require('../config/secret')
var jwt = require('jsonwebtoken')


var app = express()
app.set('superSecret',secret.secret);


router.route('/login')
  .post(function(req,res){
    User.where({userName: req.body.userName}).fetch().then(function(user) {
     if(user==null){
      res.status(400).json({error: true, data: {message: "invalid username"}});
     }else{
      if (user.get('userPass') != req.body.userPass) {
        res.status(400).json({error: true, data: {message: 'invalid password'}});
      } else {
    const payload = {
      user: user.get('userName')};
        var token = jwt.sign(payload, app.get('superSecret'), {
          expiresIn: 1440
        });
        res.status(200).json({error: false, data: {token: token}});
     }}
    }).catch(function(err) {
      res.status(500).json({error: true, data: {message: err.message}});
    })
  });

router.route('/register')
  .post(function(req,res){
    if(req.body.userPass!=req.body.passConf){
      res.status(400).json({error: true, data: {message: "invalid confirmation password"}});
    }else{
  var user =new User({
    userName:req.body.userName,
    userPass:req.body.userPass,
  });
  user.save().then(function(){
    res.status(200).json({error: false, data: {message: "success"}});
  }).catch(function(err){
    res.status(500).json({error: true, data: {message: err.message}});
  });
}});



module.exports = router;