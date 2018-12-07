var db_r = require('../config/db').db_r()
var db_w = require('../config/db').db_w()
var mysql = require('mysql')
var bcrypt = require('bcrypt')
var BCRYPT_SALT_ROUNDS = 12;

function checkIfExist(userName){
  var sql = 'SELECT tbl_users.userID FROM tbl_users WHERE tbl_users.userName = ' + mysql.escape(userName);
  db_r.query(sql, function (err, result) {
    if (err) {console.log(err);return false}else{
    if(result==""){
      return false
      }else{
        return true
      }
    }
  })
}

exports.postLogin = function(req,res) {
  if(req.body.userName==""||req.body.userPass==""){
    return res.status(200).json({error:true, message: "no input" });
  }
  if(Boolean(checkIfExist(req.body.userName))){
    return res.status(200).json({error:true, message: "no user with that name" });
  }else{
  var sql = 'SELECT tbl_users.userPass,tbl_users.userID FROM tbl_users WHERE tbl_users.userName LIKE ' + mysql.escape(req.body.userName);
  db_r.query(sql, function (err, result) {
    if (err) {return res.status(200).json({error:true,message: "Something went wrong" });}
    if(result!=""){
      if(bcrypt.compareSync(req.body.userPass,result[0].userPass)){
        return res.status(200).json({ error:false,userID:result[0].userID,message: "connection accepted" });
      }else{
        return res.status(200).json({ error:true,message: "wrong password" });
      }
    } return res.status(200).json({error:true,message: "user not found" });
    })
  }
}
exports.postRegister = function(req,res) {
  if(req.body.userName==""||req.body.userPass==""){
    return res.status(500).json({error:true, message: "no input" });
  }
  bcrypt.hash(req.body.userPass, BCRYPT_SALT_ROUNDS)
    .then(function(hashedPassword) {
      var sql = 'INSERT INTO  tbl_users (userName, userPass) VALUES('+mysql.escape(req.body.userName)+','+mysql.escape(hashedPassword)+')';
      db_w.query(sql, function (err, result) {
        if (err) {return res.status(300).json({error:true, message: "username already exist" });}
        if(result!=""){
          return res.status(200).json({ error:false,message: "registration accepted" }); }
            return res.status(300).json({error:true, message: "error" });   
      })
    })
}
exports.getUserSalons = function(req,res) {
  var sql = 'SELECT tbl_salons.salonName FROM tbl_salons INNER JOIN tbl_user_salon ON tbl_salons.salonID = tbl_user_salon.salonID INNER JOIN tbl_users ON tbl_user_salon.userID = tbl_users.userID WHERE tbl_users.userID LIKE ' + mysql.escape(req.params.userID);
  db_r.query(sql, function (err, result) {
    if (err) {return res.status(500).json({error:true, message: "Something went wrong" });}
    if(result!=""){
      return res.status(200).json({ error:false,nbSalon:result.length,salons: result });
      }
        return res.status(200).json({error:true, message: "user got no salon" });
      
    })
  }

exports.getUserFriends = function(req,res) {
  var sql = 'SELECT friend.userName FROM tbl_users INNER JOIN tbl_user_friend ON tbl_users.userID = tbl_user_friend.id_user INNER JOIN tbl_users as friend ON tbl_user_friend.id_friend = friend.userID WHERE tbl_users.userID LIKE ' + mysql.escape(req.params.userID);
  db_r.query(sql, function (err, result) {
    if (err) {return res.status(500).json({error:true, message: "Something went wrong" });}
    if(result!=""){
      return res.status(200).json({ error:false,nbFriend:result.length,friends: result });
      }
        return res.status(200).json({error:true, message: "user got no friend" });
      
    })
  }
