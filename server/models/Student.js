import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    subjectofinterest:{
        type:String,
        default:"None"
    },
    profilepic:{
        type:String,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
    otp:{
        type:String
    }
})

export default mongoose.model("Student",StudentSchema);