import jwt from 'jsonwebtoken'

export const  authMiddleware = (req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({message:"Token Required"})
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        req.user = decoded
        next()

    }catch(error){
        res.status(404).json({message:error.message},console.log(`authMiddleware.js file:-${error.message}`))
    }
}
