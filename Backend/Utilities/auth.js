// const crypto = require('crypto');
// const secretKey = crypto.randomBytes(64).toString('hex');
// console.log(secretKey);


const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET; 
require('dotenv').config();

exports.createAccessToken = (data) => {
    return jwt.sign(data, secretKey, { expiresIn: '1h' });
  };
  

exports.authMW = (req,res,next)=>{
    try
    {
    const token = req.header('Authorization')?.replace('Bearer ','');
    if(token){
        const verified = jwt.verify(token,secretKey);
        req.user = verified;
        next();
    }
    else
    {
        res.status(401).json({error: 'Access denied, token missing'})
    }
}
    catch(err){
        res.status(401).json({error:err.message})
    }
  }

