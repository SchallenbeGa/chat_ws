var db = require('../config/db')
var mysql = require('mysql')


function checkIfExist(userName){

  var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  if(userName.length>125||format.test(userName)){
    console.log('wrong username')
  }
  var sql = 'SELECT tbl_users.userID FROM tbl_users WHERE tbl_users.userName = ' + mysql.escape(userName);
  db.query(sql, function (err, result) {
    if (err) {console.log(err);return false}
    if(result==""){
      console.log('shiwwt');
      return false;
      }else{
        return true;
      }
    })
}

exports.postLogin = function(req,res) {
  if(!checkIfExist(req.body.userName)){
    return res.status(400).json({error:true, message: "no user with that name" });
 }else{
  var sql = 'SELECT tbl_users.userPass WHERE tbl_users.userName LIKE ' + mysql.escape(req.body.userName);
  db.query(sql, function (err, result) {
    if (err) {return res.status(500).json({error:true, message: "Something went wrong" });}
    if(result!=""){
      console.log(result)
      return res.status(200).json({ error:false,nbSalon:result.length,salons: result });
      }else{
        return res.status(200).json({error:true, message: "user got no salon" });
      }
    })
    }
    }

exports.getUserSalons = function(req,res) {
  var sql = 'SELECT tbl_salons.salonName FROM tbl_salons INNER JOIN tbl_user_salon ON tbl_salons.salonID = tbl_user_salon.salonID INNER JOIN tbl_users ON tbl_user_salon.userID = tbl_users.userID WHERE tbl_users.userID LIKE ' + mysql.escape(req.params.userID);
  db.query(sql, function (err, result) {
    if (err) {return res.status(500).json({error:true, message: "Something went wrong" });}
    if(result!=""){
      return res.status(200).json({ error:false,nbSalon:result.length,salons: result });
      }else{
        return res.status(200).json({error:true, message: "user got no salon" });
      }
    })
  }

exports.getUserFriends = function(req,res) {
    var sql = 'SELECT friend.userName FROM tbl_users INNER JOIN tbl_user_friend ON tbl_users.userID = tbl_user_friend.id_user INNER JOIN tbl_users as friend ON tbl_user_friend.id_friend = friend.userID WHERE tbl_users.userID LIKE ' + mysql.escape(req.params.userID);
    db.query(sql, function (err, result) {
    if (err) {return res.status(500).json({error:true, message: "Something went wrong" });}
    if(result!=""){
      return res.status(200).json({ error:false,nbFriend:result.length,friends: result });
      }else{
        return res.status(200).json({error:true, message: "user got no friend" });
      }
    })
  }
