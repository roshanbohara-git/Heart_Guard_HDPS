import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiOutlineHome, HiOutlineChartBar, HiOutlineClipboardList, HiOutlineUsers, HiOutlineLogout } from 'react-icons/hi';
import { GiHeartOrgan } from 'react-icons/gi';
import './Navbar.css';

export default function Navbar() {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to={role === 'admin' ? '/admin' : '/dashboard'} className="navbar-brand">
          <div className="navbar-logo">
            <GiHeartOrgan color="white" size={20} />
          </div>
          <div className="navbar-title">
            Heart<span>Guard</span>
          </div>
        </NavLink>

        <div className="navbar-links">
          {role === 'admin' ? (
            <>
              <NavLink to="/admin" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <span className="nav-link-icon"><HiOutlineHome /></span>
                <span>Dashboard</span>
              </NavLink>
              <NavLink to="/admin/users" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <span className="nav-link-icon"><HiOutlineUsers /></span>
                <span>Users</span>
              </NavLink>
              <NavLink to="/admin/predictions" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <span className="nav-link-icon"><HiOutlineClipboardList /></span>
                <span>Predictions</span>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <span className="nav-link-icon"><HiOutlineHome /></span>
                <span>Dashboard</span>
              </NavLink>
              <NavLink to="/predict" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <span className="nav-link-icon"><HiOutlineChartBar /></span>
                <span>Predict</span>
              </NavLink>
              <NavLink to="/my-predictions" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <span className="nav-link-icon"><HiOutlineClipboardList /></span>
                <span>History</span>
              </NavLink>
            </>
          )}
        </div>

        <div className="navbar-user">
          <div className="navbar-user-info">
            <span className={`navbar-role-badge ${role}`}>{role}</span>
            <span className="navbar-username">{user?.username}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <HiOutlineLogout />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
