import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('access_token'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const res = await API.get('/users/me');
      setUser(res.data);
      setRole(res.data.role);
      localStorage.setItem('role', res.data.role);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    const res = await API.post('/auth/login', { username, password });
    const { access_token, role: userRole } = res.data;
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('role', userRole);
    localStorage.setItem('username', username);
    setToken(access_token);
    setRole(userRole);
    return userRole;
  };

  const register = async (fullName, username, email, password, selectedRole) => {
    await API.post('/auth/register', {
      full_name: fullName,
      username,
      email,
      password,
      role: selectedRole,
    });
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    setToken(null);
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, role, loading, login, register, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
