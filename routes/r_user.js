'use strict';

var express = require('express');
var db = require('../config/db')
var router = express.Router();

const checkAuth = require("../modules/check_auth");

db.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})

exports.getUserByID = function(userID, done) {
  db.get().query('SELECT * FROM tbl_user WHERE userID = ?', userID, function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

/*
router.get("/", checkAuth, (req, res, next) => {
 User.fetchAll().then(result => {
   res.status(200).json({ message: result });
 });
});

router.post("/friends", (req, res, next) => {
  if(req.body.userName==null || req.body.userName == ""){
    res.status(500).json({error: true, data: {message: "missing username"}});
  }else{
     connection.query('SELECT * FROM people', function(err, results) {
        if (err) throw err
        console.log(results[0].id)
        console.log(results[0].name)
        console.log(results[0].age)
        console.log(results[0].address)
      })
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
*/
module.exports = router;