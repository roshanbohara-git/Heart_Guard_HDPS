import './StatsCard.css';

export default function StatsCard({ icon, label, value, description, accentColor }) {
  const style = accentColor
    ? {
        '--card-accent': accentColor,
        '--icon-bg': `${accentColor}18`,
        '--icon-color': accentColor,
      }
    : {};

  return (
    <div className="stats-card" style={style}>
      <div className="stats-card-header">
        <div className="stats-card-icon">{icon}</div>
        <span className="stats-card-label">{label}</span>
      </div>
      <div className="stats-card-value">{value}</div>
      {description && <div className="stats-card-desc">{description}</div>}
    </div>
  );
}
