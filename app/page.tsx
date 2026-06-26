'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import StatsCard from '@/components/StatsCard';
import FeedbackCard from '@/components/FeedbackCard';
import { useToast } from '@/components/Toast';

interface Stats {
  totalAnimals: number;
  totalFeedback: number;
  openFeedback: number;
  criticalFeedback: number;
  recentFeedback: Array<{
    _id: string;
    title: string;
    description: string;
    animalName: string;
    category: string;
    severity: string;
    status: string;
    reporterName: string;
    createdAt: string;
  }>;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const { showToast } = useToast();

  const fetchStats = async () => {
    try {
      const res = await fetch('https://animalinfo.onrender.com/api/stats');
      const data = await res.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSeed = async () => {
    setSeeding(true);
    try {
      const res = await fetch('https://animalinfo.onrender.com/api/seed', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        showToast(`Database seeded: ${data.message}`);
        fetchStats();
      } else {
        showToast(data.error || 'Failed to seed database', 'error');
      }
    } catch {
      showToast('Failed to seed database. Check your MongoDB connection.', 'error');
    } finally {
      setSeeding(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-spinner">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  const isEmpty = !stats || (stats.totalAnimals === 0 && stats.totalFeedback === 0);

  return (
    <div className="page-container">
      <div className="page-header animate-fade-in-up">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          Wildlife feedback overview and monitoring
        </p>
      </div>

      {isEmpty && (
        <div className="seed-banner animate-fade-in-up">
          <p>
            Your database is empty. Seed it with sample wildlife data to get started.
          </p>
          <button
            className="btn btn-primary"
            onClick={handleSeed}
            disabled={seeding}
          >
            {seeding ? 'Seeding...' : '◆ Seed Database'}
          </button>
        </div>
      )}

      <div className="stats-grid stagger-children">
        <StatsCard
          icon="🐾"
          value={stats?.totalAnimals ?? 0}
          label="Total Animals"
          delay={0}
        />
        <StatsCard
          icon="📋"
          value={stats?.totalFeedback ?? 0}
          label="Total Feedback"
          delay={100}
        />
        <StatsCard
          icon="◎"
          value={stats?.openFeedback ?? 0}
          label="Open Reports"
          delay={200}
        />
        <StatsCard
          icon="⬥"
          value={stats?.criticalFeedback ?? 0}
          label="Critical"
          delay={300}
        />
      </div>

      <div className="section-header">
        <h2 className="section-title">Recent Feedback</h2>
        <Link href="/feedback" className="btn btn-ghost">
          View all →
        </Link>
      </div>

      {stats?.recentFeedback && stats.recentFeedback.length > 0 ? (
        <div className="feedback-grid stagger-children">
          {stats.recentFeedback.map((fb) => (
            <FeedbackCard
              key={fb._id}
              id={fb._id}
              title={fb.title}
              description={fb.description}
              animalName={fb.animalName}
              category={fb.category}
              severity={fb.severity}
              status={fb.status}
              reporterName={fb.reporterName}
              createdAt={fb.createdAt}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <h3 className="empty-state-title">No feedback yet</h3>
          <p className="empty-state-description">
            Start by submitting your first animal feedback report.
          </p>
          <Link href="/feedback/new" className="btn btn-primary">
            ✏️ Submit Feedback
          </Link>
        </div>
      )}

      <div style={{ marginTop: 'var(--space-2xl)' }}>
        <div className="section-header">
          <h2 className="section-title">Quick Actions</h2>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
          <Link href="/feedback/new" className="btn btn-primary">
            ✏️ New Feedback
          </Link>
          <Link href="/animals" className="btn btn-secondary">
            🐾 View Animals
          </Link>
          <Link href="/feedback" className="btn btn-secondary">
            📋 All Feedback
          </Link>
          {!isEmpty && (
            <button
              className="btn btn-ghost"
              onClick={handleSeed}
              disabled={seeding}
            >
              {seeding ? 'Seeding...' : '↻ Re-seed Data'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
