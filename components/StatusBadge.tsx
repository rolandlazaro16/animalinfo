interface StatusBadgeProps {
  type: 'category' | 'severity' | 'status' | 'animal-status';
  value: string;
}

const classMap: Record<string, Record<string, string>> = {
  category: {
    Health: 'badge-health',
    Behavior: 'badge-behavior',
    Nutrition: 'badge-nutrition',
    Habitat: 'badge-habitat',
    General: 'badge-general',
  },
  severity: {
    Low: 'badge-low',
    Medium: 'badge-medium',
    High: 'badge-high',
    Critical: 'badge-critical',
  },
  status: {
    Open: 'badge-open',
    'In Review': 'badge-in-review',
    Resolved: 'badge-resolved',
    Closed: 'badge-closed',
  },
  'animal-status': {
    Healthy: 'badge-healthy',
    'Needs Attention': 'badge-needs-attention',
    Critical: 'badge-critical-status',
  },
};

const iconMap: Record<string, Record<string, string>> = {
  category: {
    Health: '⚕',
    Behavior: '◎',
    Nutrition: '◆',
    Habitat: '▣',
    General: '○',
  },
  severity: {
    Low: '▽',
    Medium: '◇',
    High: '△',
    Critical: '⬥',
  },
};

export default function StatusBadge({ type, value }: StatusBadgeProps) {
  const badgeClass = classMap[type]?.[value] || '';
  const icon = iconMap[type]?.[value] || '';

  return (
    <span className={`badge ${badgeClass}`}>
      {icon && <span>{icon}</span>}
      {value}
    </span>
  );
}
