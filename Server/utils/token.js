var jwt = require('jsonwebtoken');
const generateToken =(id,role)=>{
    try {
             var token = jwt.sign({id: id,role: role || "user"}, process.env.JWTSECRET_KEY);
             return token;
            // console.log(process.env.JWTSECRET_KEY);
            
    } catch (error) {
        console.log(error);
        
    }
};

module.exports = {generateToken};