const jwt = require("jsonwebtoken");

const mentorAuth = (req,res,next)=>{
    try {
        
        const {token} = req.cookies;
        if(!token){
            return res.status(401).json({success:false,message: "mentor not Authorized"})
        }

        const tokenVerified = jwt.verify(token, process.env.JWTSECRET_KEY);
        if(!tokenVerified){
            return res.status(401).json({success:false,message: "mentor not Authorized"})
        }

        console.log(tokenVerified.role);
        

        if(tokenVerified.role !=='mentor' || tokenVerified.role !=="admin"){
            return res.status(401).json({success:false,message: "mentor not Authorized"})
        }

        req.mentor = tokenVerified;
        next();


    } catch (error) {
        
    }
}

module.exports = {mentorAuth}