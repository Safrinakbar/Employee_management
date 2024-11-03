import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'
import { addEmployee, upload ,getEmployees,getEmployee, fetchEmployeesByDepId} from '../controllers/employeeController.js';

const router = express.Router();

router.get('/',authMiddleware,getEmployees)
router.post('/add', upload.single('image'),addEmployee);
router.get('/:id',authMiddleware,getEmployee)
router.get('/department/:id',authMiddleware,fetchEmployeesByDepId)


export default router;
