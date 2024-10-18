import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import AdminDashboard from './pages/admindashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import AdminSummary from './components/Dashboard/Adminsummary';
import Departmentlist from './components/departments/DepartmentList';
import AddDepartment from './components/departments/adddepartment';

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
          <Route path="departments" element={<Departmentlist />} />
          <Route path="add-department" element={<AddDepartment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
