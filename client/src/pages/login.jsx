import React, { useContext, useState } from "react";
import axios from 'axios';
import { useAuth } from "../../../server/context/authContext.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Clear previous error before submission
        setError(null);

        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            console.log('Login Response:', response.data); // Log the response data

            if (response.data.success) {
                login(response.data.user);
                localStorage.setItem("token", response.data.token);
                console.log('Logged in user:', response.data.user);

                // Redirect based on user role
                if (response.data.user.role === "admin") {
                    navigate('/admin-dashboard');
                } else {
                    navigate("/employee-dashboard");
                }
            }
        } catch (error) {
            console.error('Login Error:', error); // Log the full error for debugging
            if (error.response) {
                console.error('Error Response Data:', error.response.data);
                console.error('Error Status:', error.response.status);
                if (error.response.status === 404) {
                    setError("Endpoint not found. Please check the server URL.");
                } else if (!error.response.data.success) {
                    setError(error.response.data.error); // Set error message from response
                }
            } else {
                setError("Network or server error");
            }
        }
        
    }

    return (
        <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6">
            <h2 className="font-sevillane text-3xl text-white">Employee Management System</h2>
            <div className="border shadow p-6 w-80 bg-white">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                {error && <p className="text-red-500">{error}</p>} {/* Display error if exists */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="w-full px-3 py-2 border" 
                            placeholder="Enter valid email" 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="pwd" className="block text-gray-700">Password</label>
                        <input 
                            type="password" 
                            id="pwd" 
                            className="w-full px-3 py-2 border" 
                            placeholder="Enter password" 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="mb-4 flex items-center justify-between">
                        <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="ml-2 text-gray-700">Remember me</span>
                        </label>
                        <a href="#" className="text-teal-600">Forget password?</a>
                    </div>

                    <div className="mb-4">
                        <button type="submit" className="w-full bg-teal-600 text-white py-2">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
