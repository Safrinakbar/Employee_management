const addDepartment=async(req,res)=>{
   try{
      const {dep_name,description} =req.body;
      const newDepartment = new dep
   }catch(error){
    response.status(500).json({success: false, error: "add d"})
   }
}  
export{addDepartment}