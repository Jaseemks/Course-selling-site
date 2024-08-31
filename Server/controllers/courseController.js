const { cloudinaryInstance } = require("../config/cloudinaryConfig")
const { Course } = require("../models/courseModel");
const { handleImageUpload } = require("../utils/imageUpload");

const createCourse = async(req,res,next)=>{
    try {
        
          const {title,duration,image,discription,syllabus,price,mentor} = req.body

          let imageUrl;
          
         if(!title || !duration || !discription || !price)
            {
                return res.status(400).json({message:"all fields required"})
            } 

            const isCourseExist = await Course.findOne({title})
            if(isCourseExist)
            {
                return res.status(400).json({message:"course already exist"})
            }

            if(req.file){
            imageUrl = await  handleImageUpload(req.file.path)
            }

            const newCourse = new Course({title,duration,image: imageUrl,discription,syllabus,price,mentor})
            await newCourse.save();
            res.status(201).json({success:true,message:"course created successfully",data: newCourse})

    } catch (error) {
        next(error);
        
    }

}

module.exports = {createCourse}