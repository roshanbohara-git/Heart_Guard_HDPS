import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../api/axios';
import StatsCard from '../../components/StatsCard';
import { HiOutlineChartBar, HiOutlineClipboardList, HiOutlineExclamation, HiOutlineHeart } from 'react-icons/hi';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    try {
      const res = await API.get('/users/my-predictions');
      setPredictions(res.data);
    } catch (err) {
      console.error('Failed to fetch predictions:', err);
    } finally {
      setLoading(false);
    }
  };

  const totalPredictions = predictions.length;
  const highRisk = predictions.filter((p) => p.risk_level === 'High').length;
  const latestRisk = predictions.length > 0 ? predictions[0].risk_level : 'N/A';

  return (
    <div className="page-container user-dashboard">
      <div className="welcome-section">
        <div className="welcome-greeting">Welcome back,</div>
        <h1 className="welcome-name">
          <span>{user?.full_name || 'User'}</span> 👋
        </h1>
        <p className="welcome-text">
          Monitor your heart health with AI-powered predictions. Get instant risk assessments based on clinical data.
        </p>
        <div className="welcome-actions">
          <Link to="/predict" className="btn btn-primary">
            <HiOutlineChartBar /> New Prediction
          </Link>
          <Link to="/my-predictions" className="btn btn-secondary">
            <HiOutlineClipboardList /> View History
          </Link>
        </div>
      </div>

      <div className="dashboard-stats">
        <StatsCard
          icon={<HiOutlineClipboardList />}
          label="Total Predictions"
          value={loading ? '...' : totalPredictions}
          description="All-time predictions made"
          accentColor="#3b82f6"
        />
        <StatsCard
          icon={<HiOutlineExclamation />}
          label="High Risk"
          value={loading ? '...' : highRisk}
          description="Predictions flagged high risk"
          accentColor="#ef4444"
        />
        <StatsCard
          icon={<HiOutlineHeart />}
          label="Latest Result"
          value={loading ? '...' : latestRisk}
          description="Most recent prediction"
          accentColor={latestRisk === 'High' ? '#ef4444' : latestRisk === 'Moderate' ? '#f59e0b' : '#22c55e'}
        />
      </div>

      <div className="quick-actions">
        <Link to="/predict" className="quick-action-card">
          <div className="quick-action-icon purple">
            <HiOutlineChartBar />
          </div>
          <div className="quick-action-content">
            <h3>Run Prediction</h3>
            <p>Enter your clinical data to get an AI-powered heart disease risk assessment.</p>
          </div>
        </Link>
        <Link to="/my-predictions" className="quick-action-card">
          <div className="quick-action-icon blue">
            <HiOutlineClipboardList />
          </div>
          <div className="quick-action-content">
            <h3>Prediction History</h3>
            <p>View all your past predictions, results, and risk levels over time.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
