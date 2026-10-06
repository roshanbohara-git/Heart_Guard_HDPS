import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';
import StatsCard from '../../components/StatsCard';
import { HiOutlineUsers, HiOutlineClipboardList, HiOutlineExclamation, HiOutlineArrowRight } from 'react-icons/hi';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentPredictions, setRecentPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, usersRes, predsRes] = await Promise.all([
        API.get('/admin/dashboard-stats'),
        API.get('/admin/users'),
        API.get('/admin/predictions'),
      ]);
      setStats(statsRes.data);
      setRecentUsers(usersRes.data.slice(0, 5));
      setRecentPredictions(predsRes.data.slice(0, 5));
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    });
  };

  const riskBadge = (level) => {
    const cls = level === 'High' ? 'high' : level === 'Moderate' ? 'moderate' : 'low';
    return <span className={`badge badge-${cls}`}>{level}</span>;
  };

  if (loading) {
    return (
      <div className="page-container" style={{ display: 'flex', justifyContent: 'center', paddingTop: '4rem' }}>
        <div className="spinner" style={{ width: 36, height: 36, borderWidth: 3 }} />
      </div>
    );
  }

  return (
    <div className="page-container admin-dashboard">
      <div className="page-header">
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-subtitle">System overview and management</p>
      </div>

      <div className="admin-stats-grid">
        <StatsCard
          icon={<HiOutlineUsers />}
          label="Total Users"
          value={stats?.total_users ?? 0}
          description="Registered accounts"
          accentColor="#3b82f6"
        />
        <StatsCard
          icon={<HiOutlineClipboardList />}
          label="Total Predictions"
          value={stats?.total_predictions ?? 0}
          description="All-time predictions"
          accentColor="#7c3aed"
        />
        <StatsCard
          icon={<HiOutlineExclamation />}
          label="High Risk"
          value={stats?.high_risk_predictions ?? 0}
          description="High risk predictions"
          accentColor="#ef4444"
        />
      </div>

      <div className="admin-section">
        <div className="admin-section-header">
          <h2 className="admin-section-title">
            <HiOutlineUsers /> Recent Users
          </h2>
          <Link to="/admin/users" className="admin-view-all">
            View All <HiOutlineArrowRight />
          </Link>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.full_name}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td><span className={`badge badge-${u.role}`}>{u.role}</span></td>
                  <td>{formatDate(u.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="admin-section">
        <div className="admin-section-header">
          <h2 className="admin-section-title">
            <HiOutlineClipboardList /> Recent Predictions
          </h2>
          <Link to="/admin/predictions" className="admin-view-all">
            View All <HiOutlineArrowRight />
          </Link>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Age</th>
                <th>Sex</th>
                <th>Prediction</th>
                <th>Risk</th>
              </tr>
            </thead>
            <tbody>
              {recentPredictions.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{formatDate(p.created_at)}</td>
                  <td>{p.age}</td>
                  <td>{p.sex}</td>
                  <td>{p.prediction}</td>
                  <td>{riskBadge(p.risk_level)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
