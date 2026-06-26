interface StatsCardProps {
  icon: string;
  value: number | string;
  label: string;
  delay?: number;
}

export default function StatsCard({ icon, value, label, delay = 0 }: StatsCardProps) {
  return (
    <div
      className="stat-card"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="stat-icon">{icon}</div>
      <div className="stat-value" style={{ animationDelay: `${delay + 200}ms` }}>
        {value}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
