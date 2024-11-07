import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'
import { addLeave ,getLeave,getLeaves,getLeaveDetail,updateLeave} from '../controllers/leaveController.js';
const router = express.Router();


router.post('/add',authMiddleware, addLeave);
router.get('/:id/:role',authMiddleware, getLeave);
router.get('/detail/:id/:role',authMiddleware, getLeaveDetail);
router.put('/:id',authMiddleware, updateLeave);
router.get('/',authMiddleware,getLeaves)


export default router;
