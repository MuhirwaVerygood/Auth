import mongoose from "mongoose"
import { ref } from "process"
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title:{
        type: String,
        required  : true
    },
    
    content:{
        type: String,
        required  : true
    },

    body:{
        type: String,
        required  : true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:"User",
        required:true
    }
})

export const blogModel = mongoose.model("blogs", blogSchema)
