import React from 'react'
import { Link } from 'react-router-dom'


const List =() =>{
    return(
        <div className="p-5">
        <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Employees</h3>
        </div>
        <div className="flex justify-between items-center">
            <input type="text" placeholder="Search by dep name" className="px-4 py-0.5 border" />
            <Link to="/admin-dashboard/employees" className="px-4 py-1 bg-teal-600 rounded text-white">Add New Employee</Link>
        </div>
    </div>
    )
}
export default List