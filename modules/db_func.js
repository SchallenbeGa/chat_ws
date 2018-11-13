
const sequelize = require('./db_connect')
const users = require('../models/user')

const Sequelize = require('../node_modules/sequelize')

  

exports.getUserID = function (username) {
 users.findOne({ where: {Username: username} }).then(users => {
  console.log(users.userid);
  return (users.userid)
  
  })}
  /*
exports.getUserFriends = function (userid) {
  friends.findAll({ where: {id_user: userid} }).then(friends => {
     console.log(friends.userid)
    })}*/