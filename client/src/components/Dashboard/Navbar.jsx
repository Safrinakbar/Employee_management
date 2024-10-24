import React from "react";
import { useAuth } from "../../../../server/context/authContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="flex items-center text-white justify-between h-12 bg-teal-600 px-5">
            <p>Welcome {user.name}</p>
            <button 
                className="px-4 py-1 bg-teal-700 hover:bg-teal-800" 
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
};

export default Navbar;
