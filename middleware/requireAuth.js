const jwt = require('jsonwebtoken')
const User = require('../models/user')
async function requireAuth(req,res,next){
  try{
  // Read token from the cookie
  const token = req.cookies.Authorization;

  //decode the token
  const decoded = jwt.verify(token, process.env.SECRET);

  // find the user using decoded sub
   const user = await User.findById(decoded.sub);
   if(!user) return res.sendStatus(401);

  // attach user to request
  req.user = user;

  // continue on 
  next();

  }catch(err){
    return res.sendStatus(401);

  }

}
module.exports = requireAuth;