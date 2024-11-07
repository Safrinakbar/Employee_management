import express from 'express'
import { login,verify} from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'


const route =express.Router()

route.post('/login', login)

route.get('/verify', (req, res) => {
    console.log("Verify route hit"); // This log should appear in the terminal
    res.status(200).json({ success: true, message: "User verified" });
});


export default route;