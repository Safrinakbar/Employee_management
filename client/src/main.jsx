import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import AuthProvider from '../../server/context/authContext.jsx'; // Ensure this is the correct path and naming

createRoot(document.getElementById('root')).render(
    <AuthProvider> 
      <App />
    </AuthProvider>
);
