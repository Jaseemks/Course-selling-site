const { User } = require("../models/userModel");
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/token");

const userSignup = async(req,res,next)=>{
    try {
        const {name,email,password,phone,profilepic,course}=req.body;

        if(!name||!email||!password){
           return res.status(400).json({success:false,message:'all fields required'});
        }
        const isUserExist = await User.findOne({email});
        if(isUserExist){
           return res.status(400).json({message:"user already exist"});
        }
    

        //password hashing
        const saltRounds=10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        console.log(hashedPassword,'--------');
    
        const newUser = new User({name,email,password:hashedPassword,phone,profilepic})
        await newUser.save();

        const token = generateToken(newUser._id)

        res.cookie("token",token);
         res.json({success:true, message:"user created successfully"})

    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({message:error||'internal server error'})
        
    }
}


const userLogin = async(req,res,next)=>{
    try {
        const {email,password}=req.body;
        if(!email||!password){
           return res.status(400).json({success:false,message:'all fields required'});
        }
        const isUserExist = await User.findOne({email});
        if(!isUserExist){
           return res.status(404).json({message:"user not exist"});
        }
    

        //password decrypting
        // Load hash from your password DB.
         const isPasswordMatch = bcrypt.compareSync(password, isUserExist.password); // true / false
         if(!isPasswordMatch){
            return res.status(401).json({success:false,message:'Password Does not match'});
         }    


        const token = generateToken(isUserExist._id)

        res.cookie("token",token);
         res.json({success:true, message:"Login successfull"})

    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({message:error||'internal server error'})
        
    }
}


const userLogout = async(req,res,next)=>{
    try {
        console.log("ggggggggggggggggggggggggggggg");
        
        res.clearCookie('token');
         res.json({message:"Logout successfull"})

    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({message:error||'internal server error'})
        
    }
}


const userProfile = async(req,res,next)=>{
    try {
        
        const {user}= req;
        console.log(user,'======user');
        
        const {id} = req.params;
        const userData = await User.findOne({_id:user.id});
        res.json({success:true, message: "user data fetched", data:userData});

    } catch (error) {
        // next(error);
        
    }
}

// const updateUser = async(req,res,next)=>{
//     try {
        
//         const {user}= req;
//         console.log(user,'======user');
        
//         // const {id} = req.params;
//         // const userData = await User.findOne({_id:user.id});
//         // res.json({success:true, message: "user data fetched", data:userData});

//     } catch (error) {
//         console.log(error);
//         res.status(error.statusCode || 500).json({message:error||'internal server error'})
        
//     }
// }


const checkUser = async(req,res,next)=>{
    try {
        
        const {user} = req;
        if(!user){

            return res.status(404).json({success:false,message:"user not exist"});
        }

        res.json({success:true, message: "user Authorized"});

    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({message:error||'internal server error'})
        
    }
}


module.exports ={userSignup,userLogout,userLogin,checkUser,userProfile}