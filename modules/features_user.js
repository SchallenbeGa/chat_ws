var db = require('../config/db')
var mysql = require('mysql');

exports.getUserFriends = function(req,res) {
    var sql = 'SELECT friend.userName FROM tbl_users INNER JOIN tbl_user_friend ON tbl_users.userID = tbl_user_friend.id_user INNER JOIN tbl_users as friend ON tbl_user_friend.id_friend = friend.userID WHERE tbl_users.userID LIKE ' + mysql.escape(req.params.userID);
    db.query(sql, function (err, result) {
    if (err) throw err;
    if(result!=""){
      return res.status(200).json({ error:false,friends: result });
      }else{
        return res.status(500).json({error:true, message: "user got no friend" });
      }
});
}