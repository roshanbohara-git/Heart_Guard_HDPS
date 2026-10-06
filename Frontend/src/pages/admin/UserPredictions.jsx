import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../../api/axios';
import { HiOutlineArrowLeft } from 'react-icons/hi';

export default function UserPredictions() {
  const { userId } = useParams();
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserPredictions();
  }, [userId]);

  const fetchUserPredictions = async () => {
    try {
      const res = await API.get(`/admin/users/${userId}/predictions`);
      setPredictions(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch predictions.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
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
    <div className="page-container fade-in">
      <div className="page-header">
        <Link to="/admin/users" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.875rem', marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
          <HiOutlineArrowLeft /> Back to All Users
        </Link>
        <h1 className="page-title">User #{userId} Predictions</h1>
        <p className="page-subtitle">{predictions.length} prediction{predictions.length !== 1 ? 's' : ''} found</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {predictions.length === 0 && !error ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: 'var(--text-muted)' }}>This user has no predictions yet.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Age</th>
                <th>Sex</th>
                <th>Chest Pain</th>
                <th>BP</th>
                <th>Cholesterol</th>
                <th>Max HR</th>
                <th>Prediction</th>
                <th>Probability</th>
                <th>Risk</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{formatDate(p.created_at)}</td>
                  <td>{p.age}</td>
                  <td>{p.sex}</td>
                  <td>{p.chest_pain_type}</td>
                  <td>{p.resting_bp}</td>
                  <td>{p.cholesterol}</td>
                  <td>{p.max_hr}</td>
                  <td>{p.prediction}</td>
                  <td>{(p.probability * 100).toFixed(1)}%</td>
                  <td>{riskBadge(p.risk_level)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
