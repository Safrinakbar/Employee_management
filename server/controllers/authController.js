import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const login =async (req,res)=>{
     //verify  user credentials
     try{
        const {email,password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            res.status(404).json({sucess: false, error: "User not found"})
        }

        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            res.status(404).json({sucess: false, error: "Wrong password"})
        }

        //use jwt to generate token
        const token = jwt.sign({_id: user._id,role: user.role},
        process.env.JWT_KEY, {expiresIn :"10d"}
        )

        res.status(200).json({
            success: true, 
            token, 
            user: {_id: user._id,name: user.name, role:user.role},
        })
     }catch(error){
        res.status(500).json({success: false, error: error.message})
     }
}

const verify = (req,res)=>{
    return res.status(200).json({success: true,user: req.user})
}


export {login, verify}