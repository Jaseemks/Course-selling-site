const jwt = require("jsonwebtoken");

const userAuth = (req,res,next)=>{
    try {
        
        const {token} = req.cookies;
        if(!token){
            return res.status(401).json({success:false,message: "User not Authorized"})
        }

        const tokenVerified = jwt.verify(token, process.env.JWTSECRET_KEY);
        if(!tokenVerified){
            return res.status(401).json({success:false,message: "User not Authorized"})
        }
        req.user = tokenVerified;
        next();


    } catch (error) {
        
    }
}

module.exports = {userAuth}