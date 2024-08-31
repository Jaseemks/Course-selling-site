const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required : true,
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type:String,
        required:true,
        trim:true,
    },
    phone: String,
    profilepic:{
        type : String,
        default:"https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352010-stock-illustration-default-placeholder-man-and-woman.jpg",
    },
    course:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Coursse"
    }],
})

const User = mongoose.model('User',userSchema)

module.exports = {User};