import express from 'express'
import {registeruser,userlogin,createTask,getTask,getTaskById,updateTask,deleteTask} from '../Controller/UserController.js'
import { authMiddleware } from '../Middleware/authMiddleware.js';

const router = express.Router()


router.get("/tasks",authMiddleware,getTask)
router.get("/tasks/:id",authMiddleware,getTaskById)
router.post("/register", registeruser);
router.post("/login",userlogin);
router.post("/tasks",authMiddleware,createTask)
router.patch("/tasks/:id",authMiddleware,updateTask)
router.delete("/tasks/:id",authMiddleware,deleteTask)


export default router


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YWIzZjMzMTA0NmNkMDc0MDczNTMzMDQiLCJpYXQiOjE3OTAzMzIzODIsImV4cCI6MTc5MDQxODc4Mn0.VaJUXSTz8GNqQmKIvs0YLdMbwYCsLB-78mTDiaUBPfo