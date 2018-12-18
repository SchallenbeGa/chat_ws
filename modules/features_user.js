var db_w = require('../config/db').db_w()
var jwt = require('jsonwebtoken')
var secret = require('../config/secret').secret
var bcrypt = require('bcrypt')
var BCRYPT_SALT_ROUNDS = 12
db_w.connect()

  function checkIfExist(userName){
    var sql = 'SELECT tbl_users.userID FROM tbl_users WHERE tbl_users.userName = \'' +userName+'\'';
    db_w.query(sql,(err, result)=> {
      if (err) {return false}else{
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
    return res.status(200).json({error:true, message: "no input" })
  }
  if(Boolean(checkIfExist(req.body.userName))){
    return res.status(200).json({error:true, message: "no user with that name" })
  }else{
  var sql = 'SELECT userPass,userID FROM tbl_users WHERE userName LIKE \''+req.body.userName+'\'';
  db_w.query(sql, (err, result)=> {
    if (err) {return res.status(200).json({error:true,message: "Something went wrong" })}
    if(result.rows!=""){
        result=result.rows[0]
        if(bcrypt.compareSync(req.body.userPass,result.userpass)){
        const payload = {user: result.userid}
        var token = jwt.sign(payload, secret, {
          expiresIn: 1440
        })
        return res.status(200).json({ error:false,userID:result.userid,userToken:token,message: "connection accepted" })
      }}
        return res.status(200).json({ error:true,message: "wrong username or password" })
      })
  }
}


exports.postRegister = function(req,res) {
  if(req.body.userName!=""||req.body.userPass!=""){
    if(!Boolean(checkIfExist(req.body.userName))){
      return res.status(200).json({error:true, message: "username already exists" })
    }
    var salt = bcrypt.genSaltSync(BCRYPT_SALT_ROUNDS);
    var hash = bcrypt.hashSync(req.body.userPass, salt);
    var sql = 'INSERT INTO tbl_users (userName,userPass) VALUES(\''+req.body.userName+'\',\''+hash+'\')';
    db_w.query(sql,(error, result) =>{
      if (!error)
        if(result!=""){
          return res.status(200).json({ error:false,message: "registration accepted" })
        } 
      })
  }else{
  return res.status(500).json({error:true, message: "error" }) }
}
exports.postFriend = function(req,res) {
  if(req.body.userID==""||req.body.friendID==""){
    return res.status(500).json({error:true, message: "no input" });
  }
      var sql = 'INSERT INTO tbl_user_friend VALUES('+req.body.userID+','+req.body.friendID+')';
      db_w.query(sql, (err, result) =>{
        if (err) {return res.status(300).json({error:true, message: "friend already in list" });}
        if(result!=""){
          return res.status(200).json({ error:false,message: "friend added" }); }
            return res.status(300).json({error:true, message: "error no res" });   
    })
}
exports.getUserSalons = function(req,res) {
  var sql = 'SELECT tbl_salons.salonName FROM tbl_salons INNER JOIN tbl_user_salon ON currval(tbl_salons.salonID) = tbl_user_salon.salonID INNER JOIN tbl_users ON tbl_user_salon.userID = tbl_users.userID WHERE tbl_users.userID::varchar LIKE \'' + req.params.userID+'\'::varchar'
  db_w.query(sql, (err, result)=> {
    if (err) {return res.status(500).json({error:true, message: "Something went wrong" })}
    if(result!=""){
      return res.status(200).json({ error:false,nbSalon:result.rows.length,salons: result.rows })
    }
    return res.status(200).json({error:true, message: "user got no salon" })   
  })
}

exports.getUserFriends = function(req,res) {
  var sql = 'SELECT friend.userName FROM tbl_users INNER JOIN tbl_user_friend ON tbl_users.userID = tbl_user_friend.id_user INNER JOIN tbl_users as friend ON tbl_user_friend.id_friend = friend.userID WHERE tbl_users.userID::varchar LIKE \'' + req.params.userID+'\'::varchar'
  db_w.query(sql,(err, result) => {
    if (err) {return res.status(500).json({error:true, message: "Something went wrong" })}
    if(result!=""){
      return res.status(200).json({ error:false,nbFriend:result.rows.length,friends: result.rows })
    }
    return res.status(200).json({error:true, message: "user got no friend" })    
  })
}
