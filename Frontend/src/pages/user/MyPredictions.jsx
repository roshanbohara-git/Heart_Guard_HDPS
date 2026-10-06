import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';
import { HiOutlineClipboardList, HiOutlineChartBar } from 'react-icons/hi';
import './MyPredictions.css';

export default function MyPredictions() {
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

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
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
    <div className="page-container predictions-page">
      <div className="page-header">
        <h1 className="page-title">My Predictions</h1>
        <p className="page-subtitle">Your complete heart disease prediction history</p>
      </div>

      {predictions.length === 0 ? (
        <div className="card predictions-empty">
          <div className="predictions-empty-icon">
            <HiOutlineClipboardList />
          </div>
          <h3>No Predictions Yet</h3>
          <p>Run your first heart disease prediction to see results here.</p>
          <Link to="/predict" className="btn btn-primary">
            <HiOutlineChartBar /> Make a Prediction
          </Link>
        </div>
      ) : (
        <>
          <p className="predictions-count">{predictions.length} prediction{predictions.length !== 1 ? 's' : ''} found</p>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
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
        </>
      )}
    </div>
  );
}
