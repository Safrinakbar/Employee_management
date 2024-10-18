import React from "react";
import {Link} from 'react-router-dom'


const Departmentlist = () =>{
    return (
      <div className="p-5">
        <div className="text-center">
            <div className="text-2xl font-bold">
                <h3>Manage Departments</h3>
            </div>
            <div className="flex justify-between items-center">
                <input type="text" placeholder="Search by dep name" className="px-4 py-0.5 border"/>
                <Link to="/admin-dashboard/add-department" className="px-4 py-1 bg-teal-600 rounded text-white" >Add New Department</Link>
            </div>
        </div>
        </div>
    )
}

export default Departmentlist