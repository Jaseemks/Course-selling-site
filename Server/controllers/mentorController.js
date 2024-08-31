
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/token");
const { Mentor } = require('../models/mentorModel');


const mentorSignup = async(req,res,next)=>{
    try {
        const {name,email,password,department,qualificaton,phone,profilepic,course}=req.body;

        if(!name||!email||!password){
           return res.status(400).json({success:false,message:'all fields required'});
        }
        const isMentorExist = await Mentor.findOne({email});
        if(isMentorExist){
           return res.status(400).json({message:"Mentor already exist"});
        }
    

        //password hashing
        const saltRounds=10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        console.log(hashedPassword,'--------');
    
        const newMentor = new Mentor({name,email,password:hashedPassword,department,qualificaton,phone,profilepic,course})
        await newMentor.save();

        const token = generateToken(newMentor._id,"mentor")

        res.cookie("token",token);
         res.json({success:true, message:"Mentor created successfully"})

    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({message:error||'internal server error'})
        
    }
}


const mentorLogin = async(req,res,next)=>{
    try {
        const {email,password}=req.body;
        if(!email||!password){
           return res.status(400).json({success:false,message:'all fields required'});
        }
   
        const isMentorExist = await Mentor.findOne({email});
        if(!isMentorExist){
           return res.status(404).json({message:"Mentor not exist"});
        }
    

        //password decrypting
        // Load hash from your password DB.
         const isPasswordMatch = bcrypt.compareSync(password, isMentorExist.password); // true / false
         if(!isPasswordMatch){
            return res.status(401).json({success:false,message:'Password Does not match'});
         }    


        const token = generateToken(isMentorExist._id,"mentor")

        res.cookie("token",token);
         res.json({success:true, message:"Login successfull"})

    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({message:error||'internal server error'})
        
    }
}


const mentorLogout = async(req,res,next)=>{
    try {

        
        res.clearCookie('token');
         res.json({message:"Logout successfull"})

    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({message:error||'internal server error'})
        
    }
}


// const mentorProfile = async(req,res,next)=>{
//     try {
        
//         const {mentor}= req;
//         // console.log(Mentor,'======Mentor');
        
//         const {id} = req.params;
//         const mentorData = await Mentor.findOne({_id:mentor.id});

//         res.json({success:true, message: "Mentor data fetched", data:mentorData});

//         console.log(mentorData);
        
//     } catch (error) {
//         console.log(error);
//         res.status(error.statusCode || 500).json({message:error||'internal server error'})
        
//     }
// }


const mentorProfile = async(req,res,next)=>{
    try {
        
        const {mentor}= req;
        console.log(mentor,'======mentor');
        
        const {id} = req.params;
        const mentorData = await Mentor.findOne({_id:mentor.id});
        res.json({success:true, message: "user data fetched", data:mentorData});

    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({message:error||'internal server error'})
        
    }
}









// const updateUser = async(req,res,next)=>{
//     try {
        
//         const {user}= req;
//         console.log(user,'======user');
        
//         const {id} = req.params;
//         const userData = await User.findOne({_id:user.id});
//         res.json({success:true, message: "user data fetched", data:userData});

//     } catch (error) {
//         console.log(error);
//         res.status(error.statusCode || 500).json({message:error||'internal server error'})
        
//     }
// }


const checkMentor = async(req,res,next)=>{
    try {
        
        const {Mentor} = req;
        if(!Mentor){

            return res.status(404).json({success:false,message:"Mentor not exist"});
        }

        res.json({success:true, message: "Mentor Authorized"});

    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({message:error||'internal server error'})
        
    }
}


module.exports ={mentorSignup,mentorLogout,mentorLogin,checkMentor,mentorProfile}