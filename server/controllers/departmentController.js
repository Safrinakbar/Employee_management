import Department from "../models/Departments.js";

const addDepartment = async (req, res) => {
   try {
     const { dep_name, description } = req.body;
     const newDep = new Department({
       dep_name,
       description
     });
 
     await newDep.save()
     return res.status(200).json({ success: true, department: newDep });
   } catch (error) {
     console.error("Server Error:", error); // Log the error in the server console
     res.status(500).json({ success: false, error: error.message || "Server error while adding department" });
   }
 };
export {addDepartment}; 