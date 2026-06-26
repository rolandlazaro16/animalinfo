import Link from 'next/link';
import StatusBadge from './StatusBadge';

interface FeedbackCardProps {
  id: string;
  title: string;
  description: string;
  animalName: string;
  category: string;
  severity: string;
  status: string;
  reporterName: string;
  createdAt: string;
}

export default function FeedbackCard({
  id,
  title,
  description,
  animalName,
  category,
  severity,
  status,
  reporterName,
  createdAt,
}: FeedbackCardProps) {
  const timeAgo = (dateStr: string) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Link href={`/feedback/${id}`} style={{ textDecoration: 'none' }}>
      <div className="feedback-card">
        <div className="feedback-card-header">
          <h3 className="feedback-card-title">{title}</h3>
          <StatusBadge type="severity" value={severity} />
        </div>

        <div className="feedback-card-badges">
          <StatusBadge type="category" value={category} />
          <StatusBadge type="status" value={status} />
        </div>

        <p className="feedback-card-description">{description}</p>

        <div className="feedback-card-footer">
          <span>
            🐾 {animalName} · {reporterName}
          </span>
          <span>{timeAgo(createdAt)}</span>
        </div>
      </div>
    </Link>
  );
}
