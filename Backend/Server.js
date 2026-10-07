
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


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server Running for port no. ${PORT}`)
})


