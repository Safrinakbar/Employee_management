import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const userContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (token) {
          const response = await axios.get('http://localhost:5000/api/auth/verify', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          console.log('Response from verification:', response.data);  

          if (response.data.success) {
            setUser(response.data.user); 
          } else {
            setUser(null);
          }
        } else {
          setUser(null); 
        }
      } catch (error) {
        console.error('Verification Error:', error);  
        setUser(null);
      } finally {
        setLoading(false); 
      }
    };

    verifyUser(); 
  }, []);

  
  const login = (user) => {
    setUser(user);
  };

 
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <userContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </userContext.Provider>
  );
};

// Custom hook to use the Auth context in components
export const useAuth = () => useContext(userContext);

export default AuthProvider;
