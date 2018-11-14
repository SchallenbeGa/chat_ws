'use strict';

var express = require('express');
var User = require('../models/user');
var router = express.Router();

router.route('/login')
  .post(function(req,res){
    User.where({userName: req.body.userName}).fetchAll().then(function(user) {
     if(user==null){
      res.status(400).json({error: true, data: "invalid username"});
     }else{
       console.log(user)
       console.log(req.body.userPass+" "+user.userPass);
      if (user.data.userPass != req.body.userPass) {
        res.json({ success: false, message: 'invalid password' });
      } else {
    const payload = {
      user: user.userName};
        var token = jwt.sign(payload, app.get('superSecret'), {
          expiresInMinutes: 1440 // expires in 24 hours
        });
        // return the information including token as JSON
        res.json({
          success: true,
          message: '',
          token: token
        });
     }}
    }).catch(function(err) {
      res.status(500).json({error: true, data: {message: err.message}});
    })
  });

router.route('/signup')
  .post(function(req,res){
  var user =new User({
    userName:req.body.userName,
    userPass:req.body.userPass
  });
  user.save().then(function(saved_user){
    res.status(303).json({error: false, data: {message: "success"}});
  }).catch(function(err){
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

router.route('/destroy/:id')
  .post(function(req,res){
 if(req.body)
  user.save().then(function(saved_user){
    res.status(303).json({error: false, data: {message: "success"}});
  }).catch(function(err){
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

module.exports = router;