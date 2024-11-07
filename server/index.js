import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import departmentRouter from './routes/department.js';
import employeeRouter from './routes/employee.js';
import connectToDatabase from './db/db.js';
import salaryRouter from './routes/salary.js'
import leaveRouter from './routes/leave.js'
import settingRouter from './routes/setting.js'
import dashboardRouter from './routes/dashboard.js'


const app = express();

// Connect to the database
connectToDatabase();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads/:id', express.static('uploads'));

// Routes
app.use('/api/auth', authRouter);

app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/salary',salaryRouter)
app.use('/api/leave',leaveRouter)
app.use('/api/setting',settingRouter)
app.use('/api/dashboard',dashboardRouter)

// Start the server
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
});
