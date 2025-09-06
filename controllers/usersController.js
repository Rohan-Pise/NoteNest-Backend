const bcrypt = require("bcryptjs"); 
var jwt = require('jsonwebtoken');
const User = require('../models/user');

async function signup (req,res){
  try{
//Get the email and password from body
const{email,password} = req.body; 

//check if user already exists
const doesExists = await User.findOne({email});
if(doesExists) return res.status(401).json({msg : "User already exists with same username"})

//Hashed password
const hashedpassword = bcrypt.hashSync(password,8);

//Create a user with the data obtained in DB
await User.create({email,password:hashedpassword});

//respond
res.sendStatus(200);
  }catch(err){
    console.log(err);
  }

}

async function login(req,res){
  //Get the email and password from the request body
 const {email,password} = req.body

  //Find the user with requested email
const user = await User.findOne({email});
if(!user) return res.sendStatus(403);

  //compare sent in password with found user password hash
   const passwordMatch = bcrypt.compareSync(password,user.password);
   if(!passwordMatch) return res.sendStatus(401);

  //Create a Jwt token
  const exp = Date.now()+1000*60*60*24*30
  const token = jwt.sign({sub:user._id,exp},process.env.SECRET)

  //send it
  res.cookie('Authorization',token,{
    expires:new Date(exp),
    httpOnly:true,
    sameSite:'lax',
    secure:process.env.NODE_ENV === "production",
  })
  res.sendStatus(200);
}

function logout(req,res){
  res.clearCookie("Authorization");
  res.sendStatus(200);
}

function checkAuth(req,res){
  console.log(req.user)
  res.sendStatus(200);
}


module.exports={signup,login,logout,checkAuth};