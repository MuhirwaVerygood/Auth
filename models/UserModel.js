import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String, 
        required: true
    },

    email:{
        type: String, 
        required: true
    },

    isAdmin:{
        type: Boolean,
        default: false
    },

    password:{
        type: String, 
        required: true
    },
}, {timeStamp: true })

const userModel = mongoose.model("userModel", userSchema)
export default userModel;