import mongoose from "mongoose";

const taskSchema = mongoose.Schema({

    title:{
        type:String,
        required:true,
        minlength:[3]
    },
    description:{
        type:String,
        required:true,
        minlength:[3]
    },
     status:{
        type:String,
        enum:["pending","In Progress","Completed"],
        default:"pending"
     },

     user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
     }
},
{
    timestamps:true
}
);

const Task = mongoose.model("Task",taskSchema)

export default Task