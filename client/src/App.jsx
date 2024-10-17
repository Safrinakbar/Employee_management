import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/login';
import AdminDashboard from './pages/admindashboard';
import EmployeeDashboard from './pages/employeeDashboard';

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to='/admin-dashboard'/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/admin-dashboard' element={<AdminDashboard/>}></Route>
      <Route path='/employee-dashboard' element={<EmployeeDashboard/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
