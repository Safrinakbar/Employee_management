import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import AdminDashboard from './pages/admindashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import AdminSummary from './components/Dashboard/Adminsummary';
import Departmentlist from './components/departments/DepartmentList';
import AddDepartment from './components/departments/AddDepartment';
import EditDepartment from './components/departments/EditDepartment';
import List from './components/employee/list';
import Add from './components/employee/Add';
import View from './components/employee/view';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to /admin-dashboard */}
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />

        {/* Public route: Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected route: Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requireRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          {/* Nested Routes */}
          <Route index element={<AdminSummary />} />
          <Route path="/admin-dashboard/departments" element={<Departmentlist />} />
          <Route path="/admin-dashboard/add-department" element={<AddDepartment />} />
          <Route path="/admin-dashboard/department/:id" element={<EditDepartment />} />
          <Route path="/admin-dashboard/employees" element={<List />} />
          <Route path="/admin-dashboard/add-employee" element={<Add />} />
          <Route path="/admin-dashboard/employees/:id" element={<View />} />


          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
