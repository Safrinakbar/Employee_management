// controllers/salaryController.js
import Salary from '../models/Salary.js';
import Employee from "../models/Employee.js"

const addSalary = async (req, res) => {
    try {
        console.log("Received data:", req.body); 
        const { employeeId, basicSalary, allowances, deduction, payDate } = req.body;

        const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deduction);

        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            deduction,
            netSalary: totalSalary,
            payDate,
        });

        await newSalary.save();
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error saving salary:", error); 
        return res.status(500).json({ success: false, error: "salary add server error" });
    }
};



const getSalary = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Received request for salary ID: ${id}`);
        let salary;
        salary = await Salary.find({employeeId:id}).populate('employeeId','employeeId');
        if(!salary||salary.length < 1){
            const employee = await Employee.findOne({userId: id})
            salary = await Salary.find({employeeId: employee._id}).populate('employeeId','employeeId');
        }
        console.log("Retrieved salary:", salary); 
        res.status(200).json({ success: true, salary });
    } catch (error) {
        console.error("Error fetching salary:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


    

export { addSalary, getSalary};
