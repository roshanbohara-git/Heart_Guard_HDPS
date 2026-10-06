import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/user/Dashboard';
import Predict from './pages/user/Predict';
import MyPredictions from './pages/user/MyPredictions';
import AdminDashboard from './pages/admin/AdminDashboard';
import AllUsers from './pages/admin/AllUsers';
import AllPredictions from './pages/admin/AllPredictions';
import UserPredictions from './pages/admin/UserPredictions';

function AppLayout() {
  const { token, role } = useAuth();

  return (
    <>
      {token && <Navbar />}
      <Routes>
        {/* Landing page — public homepage */}
        <Route path="/" element={token ? <Navigate to={role === 'admin' ? '/admin' : '/dashboard'} /> : <LandingPage />} />

        {/* Auth routes */}
        <Route path="/login" element={token ? <Navigate to={role === 'admin' ? '/admin' : '/dashboard'} /> : <Login />} />
        <Route path="/register" element={token ? <Navigate to={role === 'admin' ? '/admin' : '/dashboard'} /> : <Register />} />

        {/* User routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={['user']}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/predict" element={
          <ProtectedRoute allowedRoles={['user']}>
            <Predict />
          </ProtectedRoute>
        } />
        <Route path="/my-predictions" element={
          <ProtectedRoute allowedRoles={['user']}>
            <MyPredictions />
          </ProtectedRoute>
        } />

        {/* Admin routes */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AllUsers />
          </ProtectedRoute>
        } />
        <Route path="/admin/predictions" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AllPredictions />
          </ProtectedRoute>
        } />
        <Route path="/admin/users/:userId/predictions" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <UserPredictions />
          </ProtectedRoute>
        } />

        {/* Catch-all → landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
