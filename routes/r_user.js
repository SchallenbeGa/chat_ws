'use strict';

var express = require('express');
var User = require('../models/user');
var router = express.Router();

router.route('/')
  //fetch all users
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
  //signup
  .post(function(req,res){
    var user =new User({
      userName:req.body.userName,
      userPass:req.body.userPass
    });
    user.save().then(function(saved_user){
      res.send(saved_user.toJSON());
    }).catch(function(err){
      res.status(500).json({error: true, data: {message: err.message}});
    });
  });

//login
  router.route('/login')
  .post(function(req,res){
    User
      .where({'userName': req.body.userName,'userPass': req.body.userPass})
      .fetch()
      .then(function(users) {
        console.log(req.body.userName+' '+req.body.userPass)
        if(users.userName!=null){
          res.json({error: false, data: users.toJSON()});
        }else{
          res.status(400).json({error: true, data: {message: "invalid username or password"}});
        }
       
      })
      .catch(function(err){   
        console.log(err.message)
        res.status(500).json({error: true, data: {message: err.message}});
      });
  });

module.exports = router;