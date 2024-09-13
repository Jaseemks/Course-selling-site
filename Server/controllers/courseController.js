
const { Course } = require("../models/courseModel");
const { handleImageUpload } = require("../utils/imageUpload");

const createCourse = async(req,res,next)=>{
    try {
        

          const {title,duration,image,discription,syllabus,price,mentor} = req.body

          console.log(req.file);
           

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


const updateCourse = async(req,res,next)=>{
    try {

        const {id} = req.params;
        
          const {title,duration,image,discription,syllabus,price,mentor} = req.body

          console.log(req.file);
          

          let imageUrl;
          
        //  if(!title || !duration || !discription || !price)
        //     {
        //         return res.status(400).json({message:"all fields required"})
        //     } 

            const isCourseExist = await Course.findOne({_id:id})
            if(!isCourseExist)
            {
                return res.status(400).json({message:"course not exist"})
            }

            if(req.file){
            imageUrl = await  handleImageUpload(req.file.path)
            }

            const updatedCourse = await Course.findOneAndUpdate({_id:id},{title,duration,image: imageUrl,discription,syllabus,price,mentor},{new:true,upsert:true})
            res.status(201).json({success:true,message:"course updated successfully",data: updatedCourse})

    } catch (error) {
        next(error);
    }

}

const deleteCourse = async(req,res,next)=>{

    const {id} = req.params;

    const courseDeleted = await Course.findByIdAndDelete({_id:id});

    if(!courseDeleted){
        res.status(200).json({success:true,message:"course not exist"})
    }
    else{
        console.log("deleted");
        
    }

}

const getCourses = async (req, res, next) => {
    try {
        const courses = await Course.find().select("-syllabus");

        res.status(200).json({ success: true, message: "courses fetched", data: courses });
    } catch (error) {
        next(error);
    }
};
const getCourseDetails = async (req, res, next) => {
    try {
        const { courseId } = req.params;

        const courseDetails = await Course.findById(courseId).populate("mentor");

        res.status(200).json({ success: true, message: "courses fetched", data: courseDetails });
    } catch (error) {
        next(error);
    }
};
module.exports = {createCourse,updateCourse,deleteCourse,getCourseDetails,getCourses}