import Department from "../models/Departments.js";
import Employee from "../models/Employee.js"
import Leave from "../models/Leave.js";


const getSummary = async (req, res) => {
    console.log("Request received at /api/dashboard/summary");

    try {
        const totalEmployees = await Employee.countDocuments();
        console.log("Total Employees:", totalEmployees);

        const totalDepartments = await Department.countDocuments();
        console.log("Total Departments:", totalDepartments);

        const totalSalaries = await Employee.aggregate([
            { $group: { _id: null, totalSalary: { $sum: "$salary" } } }
        ]);
        console.log("Total Salaries:", totalSalaries);

        const employeeAppliedForLeave = await Leave.distinct("employeeId");
        console.log("Employees Applied for Leave:", employeeAppliedForLeave.length);

        const leaveStatus = await Leave.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);
        console.log("Leave Status Summary:", leaveStatus);

        const leaveSummary = {
            appliedFor: employeeAppliedForLeave.length,
            approved: leaveStatus.find(item => item._id === "Approved")?.count || 0,
            rejected: leaveStatus.find(item => item._id === "Rejected")?.count || 0,
            pending: leaveStatus.find(item => item._id === "Pending")?.count || 0,
        };

        console.log("Leave Summary:", leaveSummary);

        return res.status(200).json({
            success: true,
            totalEmployees,
            totalDepartments,
            totalSalaries: totalSalaries[0]?.totalSalary || 0,
            leaveSummary
        });
    } catch (error) {
        console.error("Error in getSummary:", error);
        return res.status(500).json({ success: false, message: "An error occurred while fetching the summary." });
    }
};


export {getSummary}