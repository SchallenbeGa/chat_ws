const jwt = require("jsonwebtoken");
const secret = require('../config/secret')

module.exports = (req, res, next) => {
 try {
   const token = req.headers.authorization.split(" ")[0];
   jwt.verify(token,secret.secret);
   next();
 } catch (error) {
    res.status(401).json({error: true, data: {message: "invalid token" }}); 
 }};