import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },

        email:{
            type:String,
            required:true,
            trim:true,
            unique:true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"]
        },

        password:{
            type:String,
            required:true
        }
    }
);

const user = mongoose.model("User",userSchema); 

export default user;