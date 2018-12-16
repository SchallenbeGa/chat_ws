var db = require('./config/db').db_w()
db.connect();
exports.create_tblUsers = function() {
    var sql = 'CREATE SEQUENCE users_id_seq;CREATE TABLE tbl_users(userID SERIAL PRIMARY KEY,userName Varchar (120) NOT NULL ,userPass Varchar (120) NOT NULL);';
      db.query(sql,(err, res) => {
        if (err) return '';
        for (let row of res.rows) {
          console.log(JSON.stringify(row));
        }
        db.end();
    })
}
exports.create_tblSalons = function(req,res) {
    var sql = 'CREATE SEQUENCE salons_id_seq;CREATE TABLE tbl_salons(salonID SERIAL PRIMARY KEY,salonName Varchar (120) NOT NULL);';
    db.query(sql,(err,res) => {
        if (err) return '';
        for (let row of res.rows) {
            console.log(JSON.stringify(row));
        }
        db.end();
    })
}
exports.create_tblUserFriend = function(req,res) {
    var sql = 'CREATE TABLE tbl_user_friend(id_user Int NOT NULL references tbl_users(userID),id_friend Int NOT NULL references tbl_users(userID));';
    db.query(sql,(err,res) => {
        if (err) return 'oh';
        for (let row of res.rows) {
            console.log(JSON.stringify(row));
        }
        db.end();
    })
}
exports.create_tblUserSalon = function(req,res) {
    var sql = 'CREATE TABLE tbl_user_salon(salonID Int NOT NULL references tbl_salons(salonID),userID Int NOT NULL references tbl_users(userID));';
    db.query(sql,(err,res) => {
        if (err) throw err
        for (let row of res.rows) {
            console.log(JSON.stringify(row));
        }
        db.end();
    })
}