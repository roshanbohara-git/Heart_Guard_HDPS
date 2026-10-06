import { useState } from 'react';
import API from '../../api/axios';
import { HiOutlineChartBar, HiOutlineHeart, HiOutlineClipboardCheck } from 'react-icons/hi';
import './Predict.css';

const INITIAL_FORM = {
  Age: '',
  Sex: 'M',
  ChestPainType: 'ATA',
  RestingBP: '',
  Cholesterol: '',
  FastingBS: '0',
  RestingECG: 'Normal',
  MaxHR: '',
  ExerciseAngina: 'N',
  Oldpeak: '',
  ST_Slope: 'Up',
};

export default function Predict() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const payload = {
        ...form,
        Age: parseInt(form.Age),
        RestingBP: parseInt(form.RestingBP),
        Cholesterol: parseInt(form.Cholesterol),
        FastingBS: parseInt(form.FastingBS),
        MaxHR: parseInt(form.MaxHR),
        Oldpeak: parseFloat(form.Oldpeak),
      };

      const res = await API.post('/predictions/', payload);
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Prediction failed. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  const riskClass = result?.risk_level?.toLowerCase() || '';

  return (
    <div className="page-container predict-page">
      <div className="page-header">
        <h1 className="page-title">Heart Disease Prediction</h1>
        <p className="page-subtitle">Enter clinical data to get an AI-powered risk assessment</p>
      </div>

      <div className="predict-grid">
        <div className="predict-form-section">
          <h2><HiOutlineClipboardCheck /> Clinical Data Input</h2>

          {error && <div className="alert alert-error" style={{ marginBottom: '1rem' }}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="predict-form-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="pred-age">Age</label>
                <input id="pred-age" className="form-input" name="Age" type="number"
                  placeholder="e.g. 55" value={form.Age} onChange={handleChange}
                  required min="1" max="120" />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="pred-sex">Sex</label>
                <select id="pred-sex" className="form-select" name="Sex" value={form.Sex} onChange={handleChange}>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="pred-chest">Chest Pain Type</label>
                <select id="pred-chest" className="form-select" name="ChestPainType" value={form.ChestPainType} onChange={handleChange}>
                  <option value="ATA">Atypical Angina (ATA)</option>
                  <option value="NAP">Non-Anginal Pain (NAP)</option>
                  <option value="ASY">Asymptomatic (ASY)</option>
                  <option value="TA">Typical Angina (TA)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="pred-bp">Resting Blood Pressure</label>
                <input id="pred-bp" className="form-input" name="RestingBP" type="number"
                  placeholder="mm Hg (e.g. 130)" value={form.RestingBP} onChange={handleChange}
                  required min="50" max="250" />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="pred-chol">Cholesterol</label>
                <input id="pred-chol" className="form-input" name="Cholesterol" type="number"
                  placeholder="mg/dl (e.g. 250)" value={form.Cholesterol} onChange={handleChange}
                  required min="0" max="700" />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="pred-fbs">Fasting Blood Sugar &gt; 120 mg/dl</label>
                <select id="pred-fbs" className="form-select" name="FastingBS" value={form.FastingBS} onChange={handleChange}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="pred-ecg">Resting ECG</label>
                <select id="pred-ecg" className="form-select" name="RestingECG" value={form.RestingECG} onChange={handleChange}>
                  <option value="Normal">Normal</option>
                  <option value="ST">ST-T Wave Abnormality</option>
                  <option value="LVH">Left Ventricular Hypertrophy</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="pred-hr">Max Heart Rate</label>
                <input id="pred-hr" className="form-input" name="MaxHR" type="number"
                  placeholder="e.g. 150" value={form.MaxHR} onChange={handleChange}
                  required min="60" max="250" />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="pred-angina">Exercise Angina</label>
                <select id="pred-angina" className="form-select" name="ExerciseAngina" value={form.ExerciseAngina} onChange={handleChange}>
                  <option value="N">No</option>
                  <option value="Y">Yes</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="pred-oldpeak">Oldpeak (ST Depression)</label>
                <input id="pred-oldpeak" className="form-input" name="Oldpeak" type="number"
                  placeholder="e.g. 1.5" value={form.Oldpeak} onChange={handleChange}
                  required step="0.1" min="-10" max="10" />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="pred-slope">ST Slope</label>
                <select id="pred-slope" className="form-select" name="ST_Slope" value={form.ST_Slope} onChange={handleChange}>
                  <option value="Up">Upsloping</option>
                  <option value="Flat">Flat</option>
                  <option value="Down">Downsloping</option>
                </select>
              </div>

              <div className="predict-submit">
                <button className="btn btn-primary" type="submit" disabled={loading}>
                  {loading ? <><div className="spinner" /> Analyzing...</> : <><HiOutlineChartBar /> Run Prediction</>}
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="predict-result-section">
          {result ? (
            <div className="result-card">
              <div className={`result-header ${riskClass}`}>
                <div className="result-risk-icon">
                  {riskClass === 'high' ? '🔴' : riskClass === 'moderate' ? '🟡' : '🟢'}
                </div>
                <div className="result-prediction">{result.prediction}</div>
                <span className={`badge badge-${riskClass}`}>{result.risk_level} Risk</span>
              </div>

              <div className="result-body">
                <div className="result-stat">
                  <span className="result-stat-label">Prediction</span>
                  <span className="result-stat-value">{result.prediction}</span>
                </div>
                <div className="result-stat">
                  <span className="result-stat-label">Probability</span>
                  <span className="result-stat-value">{result.probability_percent}</span>
                </div>
                <div className="result-stat">
                  <span className="result-stat-label">Risk Level</span>
                  <span className="result-stat-value">
                    <span className={`badge badge-${riskClass}`}>{result.risk_level}</span>
                  </span>
                </div>

                <div className="result-probability-bar">
                  <div className="result-stat-label">Risk Probability</div>
                  <div className="probability-track">
                    <div
                      className={`probability-fill ${riskClass}`}
                      style={{ width: `${(result.probability * 100).toFixed(1)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="result-placeholder">
              <div className="result-placeholder-icon">
                <HiOutlineHeart />
              </div>
              <h3>No Results Yet</h3>
              <p>Fill in the clinical data form and click "Run Prediction" to see results here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
