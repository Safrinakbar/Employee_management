import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";

const Add = () => {
  const [employee, setEmployee] = useState({
    employeeId: "",
    department: "",
    basicSalary: 0,
    grossSalary: 0,
    salaryDeduction: 0,
  });

  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleDepartmentChange = async (e) => {
    const selectedDepartment = e.target.value;
    setEmployee((prev) => ({ ...prev, department: selectedDepartment }));

    const emps = await getEmployees(selectedDepartment);
    setEmployees(emps);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5000/api/employee/${id}`, employee, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        console.log(error.response.data.error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Allot Salary</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <select
              name="department"
              value={employee.department}
              onChange={handleDepartmentChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Employee ID</label>
            <select
              name="employeeId"
              value={employee.employeeId}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.employeeId}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Basic Salary</label>
            <input
              type="number"
              name="basicSalary"
              value={employee.basicSalary}
              onChange={handleChange}
              placeholder="Basic Salary"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Gross Salary</label>
            <input
              type="number"
              name="grossSalary"
              value={employee.grossSalary}
              onChange={handleChange}
              placeholder="Gross Salary"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Salary Deduction</label>
            <input
              type="number"
              name="salaryDeduction"
              value={employee.salaryDeduction}
              onChange={handleChange}
              placeholder="Salary Deduction"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <button className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
          Allot Salary
        </button>
      </form>
    </div>
  );
};

export default Add;
