
import "dotenv/config"
import express from 'express'
import { connectdb } from "./db.js"
import router from "./Routes/userRoutes.js"
import { errorMiddleware } from "./Middleware/errorMiddleware.js"
import cors from 'cors'

const app = express()


app.use(express.json());
connectdb()
app.use(cors())

app.use("/api",router)

app.get("/",(req,res)=>{
    res.json({message:"Server Startad"})
})

app.get("/test-error",(req,res,next)=>{
    try{
        text()
    

    }catch(error){
        next(error)
    }
})

app.use(errorMiddleware)


app.listen(process.env.port,()=>{
    console.log(`Server Running for port no. ${process.env.port}`)
}) 



// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YWI0YjU2Njc0YjhiM2UxNjljMDM5MmIiLCJpYXQiOjE3OTAyMjc4NDcsImV4cCI6MTc5MDMxNDI0N30.GV_oeg3Dv3NQRmzEgHlv57H8FROL3BC1KROztkVG3IA"
