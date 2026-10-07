import mongoose from "mongoose";

export const connectdb = async()=>{
    try{
     await mongoose.connect(process.env.mongouri);
     console.log("mongoose connect")
    }catch(error){
        console.log("Error",error.message)
    }
}