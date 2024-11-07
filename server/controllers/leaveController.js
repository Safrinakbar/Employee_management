import Leave from "../models/Leave.js";
import Employee from "../models/Employee.js"

const addLeave = async(req,res)=>{
    try {
        console.log("Received data:", req.body); 
        const { userId,leaveType,startDate,endDate,reason } = req.body;

        const employee = await Employee.findOne({userId})
        
        const newLeave = new Leave({
            employeeId:employee._id,leaveType,startDate,endDate,reason
        });

        await newLeave.save();
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error saving salary:", error); 
        return res.status(500).json({ success: false, error: "leave add server error" });
    }
}

const getLeave = async (req, res) => {
    try {
        const { id, role } = req.params;
        console.log(`Received ID: ${id}, Role: ${role}`);  

        let leave;
        
        if (role === "admin") {
            leave = await Leave.find({ employeeId: id });
        } else {
            const employee = await Employee.findOne({ userId: id });
            if (!employee) {
                return res.status(404).json({ success: false, message: "Employee not found" });
            }
            leave = await Leave.find({ employeeId: employee._id });
        }
        
        return res.status(200).json({ success: true, leave });
    } catch (error) {
        console.error("Error fetching leaves:", error);
        return res.status(500).json({ success: false, error: "Error fetching leaves" });
    }
};





const getLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find().populate({
            path: "employeeId",
            populate: [
                { 
                    path: 'department',
                    select: 'dep_name'
                },
                {
                    path: 'userId',
                    select: 'name'
                }
            ]
        });

        return res.status(200).json({ success: true, leaves });
    } catch (error) {
        console.error("Error fetching leaves:", error);
        return res.status(500).json({ success: false, error: "Error fetching leaves" });
    }
};

const getLeaveDetail = async (req,res) => {
    try {
        const {id} = req.params;
        console.log(`Received ID: ${id}`);
        const leave = await Leave.findById({_id: id}).populate({
            path: "employeeId",
            populate: [
                { 
                    path: 'department',
                    select: 'dep_name'
                },
                {
                    path: 'userId',
                    select: 'name'
                }
            ]
        });
        console.log("Received ID:", id);

        console.log("leaves details:", leave); 
        return res.status(200).json({ success: true, leave });
    } catch (error) {
        console.error("Error fetching leaves:", error);
        return res.status(500).json({ success: false, error: "Error fetching leaves" });
    }
}

const updateLeave = async(req,res) =>{
    try{
        const {id} = req.params;
        const leave = await Leave.findByIdAndUpdate({_id: id},{status: req.body.status})
        if(!leave){
            return res.status(404).json({ success: false, error: "leave not founded" });
        }
        return res.status(200).json({success: true})

    }catch(error){
        console.log(error);
    }
}


export {addLeave, getLeave,getLeaves,getLeaveDetail,updateLeave}