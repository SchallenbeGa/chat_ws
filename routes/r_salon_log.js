'use strict';

var express = require('express');
var Salon = require('../models/salon');
var router = express.Router();

router.route('/join')
  .post(function(req,res){
    Salon.where({salonName: req.body.salonName}).fetch().then(function(salon) {
     if(salon==null){
      res.status(400).json({error: true, data: "invalid salon name"});
     }else{
      res.status(303).json({error: false, data: salon});
     } 
    }).catch(function(err) {
      res.status(500).json({error: true, data: {message: err.message}});
    })
  });
  
router.route('/join/:name')
.post(function(req,res){
  Salon.where({salonName: req.body.salonName}).fetch().then(function(salon) {
   if(salon==null){
    res.status(400).json({error: true, data: "invalid salon name"});
   }else{
    res.status(303).json({error: false, data: salon});
   } 
  }).catch(function(err) {
    res.status(500).json({error: true, data: {message: err.message}});
  })
});


router.route('/create')
  .post(function(req,res){
  var salon =new Salon({
    salonName:req.body.salonName
  });
  salon.save().then(function(saved_salon){
    res.status(303).json({error: false, data: {message: "success"}});
  }).catch(function(err){
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

router.route('/leave')
  .delete(function(req,res){
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

module.exports = router;