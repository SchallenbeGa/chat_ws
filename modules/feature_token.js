var jwt = require('jsonwebtoken')
var secret = require('../config/secret').secret

module.exports = (req, res, next) => {
      const token = req.headers.authorization.split(" ")[0]
      jwt.verify(token,secret,function(err,token){
        if(err){
          res.status(401).json({error: true, data: {message: "invalid token" }})
        }else{
          console.log(token)
          if(req.body.userID==token||req.params.userID==token){
          }else{
            console.log('hacker')
          }
          next();
        }
      });
};
   