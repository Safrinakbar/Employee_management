import jwt from 'jsonwebtoken'
import User from '../models/user.js';

const verifyUser = async (req,res,next) =>{
    try{
        const token = req.header.authorization.split('')[1];
        if(!token){
            return res.status(404).json({success: false,error: "Token Not Provided"})
        }
        
        const decoded = await jwt.verify(token, process.env.JWT_KEY)
        if(!decoded)
        {
            return res.status(404).json({success: false,error: "Token not valid"})
        }

        const user = await User.findById({_id: decoded._id}).select('-password')

        if(!user){
            return res.status(404).json({success: false,error: "user not found"})
        }
        req.user = user
        next()
    }catch(error){
        return res.status(500).json({success: false,error: "server side error"})
    }
}

export default verifyUser