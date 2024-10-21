import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const verifyUser = async (req, res, next) => {
  try {
    
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(404).json({ success: false, error: "Token Not Provided" });
    }

    const token = authorizationHeader.split(' ')[1];  
    if (!token) {
      return res.status(404).json({ success: false, error: "Token Not Provided" });
    }

    
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded) {
      return res.status(404).json({ success: false, error: "Token not valid" });
    }

    
    const user = await User.findById(decoded._id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    
    req.user = user;
    next();
    
  } catch (error) {
    
    return res.status(500).json({ success: false, error: error.message || "Server side error" });
  }
};

export default verifyUser;
