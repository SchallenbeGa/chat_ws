var db = require('./modules/db_func')

var id = db.getUserID('root')

console.log(id)

//console.log(db.getUserFriends(db.getUserID('root')));
