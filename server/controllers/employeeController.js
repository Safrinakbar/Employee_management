import Employee from "../models/Employee.js";
import User from "../models/user.js";
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose'; 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/; // Acceptable file types
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Error: File upload only supports the following filetypes - ' + filetypes));
    }
});

const addEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            employeeId,
            dob,
            gender,
            password,
            maritalStatus,
            designation,
            department,
            salary,
            role
        } = req.body;

        console.log("Password received:", password); // Log the password to see if it's being passed

        if (!password) {
            console.error("Password not provided");
            return res.status(400).json({ success: false, error: "Password is required" });
        }

        // Validate department ID
        if (!department || typeof department !== 'string' || department.length !== 24) {
            return res.status(400).json({ success: false, error: "Invalid or missing department ID" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, error: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        console.log("Hashed password:", hashPassword);

        const newUser = new User({
            name,
            email,
            password: hashPassword, 
            role,
        });

        const savedUser = await newUser.save();

        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department: new mongoose.Types.ObjectId(department),
            salary,
            name,
            email,
            role,
            password: hashPassword,
            image: req.file ? req.file.filename : ""
        });

        const savedEmployee = await newEmployee.save();
        console.log("Employee saved:", savedEmployee);

        return res.status(200).json({ success: true, message: "Employee created successfully" });

    } catch (error) {
        console.error("Error adding employee:", error);
        
        if (req.file) {
            fs.unlink(path.join("public/uploads", req.file.filename), (err) => {
                if (err) console.error('Failed to delete file:', err);
            });
        }
        
        return res.status(500).json({ success: false, error: "Server error in adding employee" });
    }
};

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find()
            .populate('userId', { password: 0 }) // Exclude password from the user data
            .populate("department");
        return res.status(200).json({ success: true, employees });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message || "Server error while fetching employees" });
    }
};

const getEmployee = async (req, res) => {
    const { id } = req.params; // id is expected to be userId
    console.log("Fetching employee with userId:", id); // Log the userId

    try {
        let employee = await Employee.findById(id)
            .populate('userId', { password: 0 })
            .populate('department');

        if (!employee) {
            console.log("Employee not found by ID, searching by userId:", id); // Log the attempt to find by userId
            employee = await Employee.findOne({ userId: id }) // Ensure you're querying with userId
                .populate('userId', { password: 0 })
                .populate('department');
        }

        if (!employee) {
            console.error("No employee found for userId:", id); // Log if employee is not found
            return res.status(404).json({ success: false, error: "Employee not found" });
        }

        console.log("Employee found:", employee); // Log the found employee
        return res.status(200).json({ success: true, employee });
    } catch (error) {
        console.error("Error fetching employee:", error);
        return res.status(500).json({ success: false, error: error.message || "Server error while fetching employee" });
    }
};







const fetchEmployeesByDepId = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Validate department ID format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error("Invalid department ID:", id);
        return res.status(400).json({ success: false, error: "Invalid department ID" });
      }
  
      // Log department ID before the query
      console.log("Valid department ID received:", id);
  
      // Query for employees in the specified department
      const employees = await Employee.find({ department: new mongoose.Types.ObjectId(id) })
        .populate('userId', { password: 0 }) // Optionally populate 'userId' and exclude 'password'
        .populate("department");
  
      // Check if employees are found
      if (!employees.length) {
        console.warn("No employees found for department ID:", id);
        return res.status(404).json({ success: false, error: "No employees found for this department" });
      }
  
      // Successfully found employees
      return res.status(200).json({ success: true, employees });
    } catch (error) {
      console.error("Detailed error in fetchEmployeesByDepId:", error.stack || error);
      return res.status(500).json({ success: false, error: "Server error while fetching employees by department ID" });
    }
  };
  



export { addEmployee, upload, getEmployees, getEmployee, fetchEmployeesByDepId};
