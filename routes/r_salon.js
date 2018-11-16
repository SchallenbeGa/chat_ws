'use strict';

var express = require('express');
var Salon = require('../models/salon');
var router = express.Router();

const checkAuth = require("../modules/check_auth");


router.get("/", checkAuth, (req, res, next) => {
    Salon.fetchAll().then(result => {
      res.status(200).json({ message: result });
    });
   });

   router.route('/join')
   .post(function(req,res){
     Salon.where({salonName: req.body.salonName}).fetch().then(function(salon) {
      if(salon==null){
       res.status(400).json({error: true, data: "invalid salon name"});
      }else{
       res.status(200).json({error: false, data: salon});
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
       res.status(200).json({error: false, data: {message: "success"}});
     }).catch(function(err){
       res.status(500).json({error: true, data: {message: err.message}});
     });
   });
   
   router.delete("/delete", checkAuth, (req, res, next) => {
    Salon.where('salonName', req.body.salonName)
    .destroy()
    .then(function() {
      res.status(200).json({error: false, data: {message: "success"}});
    }).catch(function(err){
      res.status(500).json({error: true, data: {message: err.message}});
    })})

module.exports = router;