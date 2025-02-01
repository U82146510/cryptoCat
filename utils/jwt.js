const jwt = require('jsonwebtoken');
// Verify the validity of the token.
const verifyToken = (token) =>{
    return jwt.verify(token,process.env.secret,(err,decoded)=>{
        if(err){
            console.log('Invalid Token',err.message);
        }else{
           return decoded.roomID;
        }
    });
}; 

const createToken = (roomID) =>{
    return jwt.sign({roomID},process.env.secret,{
         expiresIn:'1h'
    });
};

module.exports = {verifyToken,createToken};