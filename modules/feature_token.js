var jwt = require('jsonwebtoken')
var secret = require('../config/secret').secret

module.exports = (req, res, next) => {
  if(req.headers.authorization!=undefined){
    const token = req.headers.authorization.split(" ")[0]
    jwt.verify(token,secret,function(err,token){
      if(err){
       return res.status(401).json({error: true, data: {message: "unauthorized access" }})
      }else{
        if(req.body.userID==token.user||req.params.userID==token.user){
          next();
        }
      }
    })
    }else{
    return res.status(401).json({error: true, data: {message: "unauthorized access" }})}
  }

   