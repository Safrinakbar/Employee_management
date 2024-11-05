import Department from "../models/Departments.js";

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message || "Server error while fetching department" });
  }
};

const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;
    const newDep = new Department({
      dep_name,
      description
    });

    await newDep.save();
    return res.status(200).json({ success: true, department: newDep });
  } catch (error) {
    console.error("Server Error:", error); // Log the error in the server console
    res.status(500).json({ success: false, error: error.message || "Server error while adding department" });
  }
};

const editDepartment = async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from req.params
    const department = await Department.findById({ _id: id });
    // Check if department exists
    if (!department) {
      return res.status(404).json({ success: false, error: "Department not found" });
    }
    return res.status(200).json({ success: true, department });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ success: false, error: error.message || "Server error while editing department" });
  }
};

const deleteDepartment = async(req,res) => {
  try{
    const {id} = req.params;
    const deletedep = await Department.findById({_id: id})
    await deletedep.deleteOne()
    return res.status(200).json({success: true},deletedep)
  }catch(error){
    console.log(error);
  }
}

export { addDepartment, getDepartments, editDepartment ,deleteDepartment};
