const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({

    
    title: {
        type:String,
        required : true,
        unique:true,
    },
    duration: {
        type: String,
        required: true,
    },
    image:{
        type : String,
        default:"https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg",
    },
    discription: {
        type:String,
        required:true,
        minLength:5,
        maxLength:500,

    },
    syllabus:String,
    price: Number,
    mentor:({
            type: mongoose.Schema.Types.ObjectId,
            ref:"Mentor"
    }),
})

const Course = mongoose.model('Course',courseSchema)

module.exports = {Course};