import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiOutlineHeart, HiOutlineEye, HiOutlineEyeOff, HiOutlineUser, HiOutlineShieldCheck } from 'react-icons/hi';
import './Auth.css';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(fullName, username, email, password, role);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-brand">
          <div className="auth-brand-icon">
            <HiOutlineHeart color="white" />
          </div>
          <h1>Create your Heart<span>Guard</span> account</h1>
          <p>Start predicting heart disease risk today</p>
        </div>

        <div className="auth-card">
          {error && <div className="alert alert-error">{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-fullname">Full Name</label>
              <input
                id="reg-fullname"
                className="form-input"
                type="text"
                placeholder="e.g. John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                minLength={2}
                maxLength={100}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-username">Username</label>
              <input
                id="reg-username"
                className="form-input"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={3}
                maxLength={50}
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-email">Email</label>
              <input
                id="reg-email"
                className="form-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-password">Password</label>
              <div className="password-wrapper">
                <input
                  id="reg-password"
                  className="form-input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 5 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={5}
                  maxLength={100}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Account Type</label>
              <div className="role-selector">
                <div className="role-option">
                  <input
                    type="radio"
                    name="role"
                    id="role-user"
                    value="user"
                    checked={role === 'user'}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <label htmlFor="role-user" className="role-option-label">
                    <span className="role-option-icon">
                      <HiOutlineUser />
                    </span>
                    <span className="role-option-title">User</span>
                    <span className="role-option-desc">Get heart disease predictions</span>
                  </label>
                </div>

                <div className="role-option">
                  <input
                    type="radio"
                    name="role"
                    id="role-admin"
                    value="admin"
                    checked={role === 'admin'}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <label htmlFor="role-admin" className="role-option-label">
                    <span className="role-option-icon">
                      <HiOutlineShieldCheck />
                    </span>
                    <span className="role-option-title">Admin</span>
                    <span className="role-option-desc">Manage users & view all data</span>
                  </label>
                </div>
              </div>
            </div>

            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? <><div className="spinner" /> Creating account...</> : 'Create Account'}
            </button>
          </form>
        </div>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
