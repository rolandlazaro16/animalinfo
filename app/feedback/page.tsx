'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import FeedbackCard from '@/components/FeedbackCard';
import SearchFilter from '@/components/SearchFilter';

interface FeedbackItem {
  _id: string;
  title: string;
  description: string;
  animalName: string;
  category: string;
  severity: string;
  status: string;
  reporterName: string;
  createdAt: string;
}

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [severity, setSeverity] = useState('');
  const [status, setStatus] = useState('');

  const fetchFeedback = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (category) params.set('category', category);
      if (severity) params.set('severity', severity);
      if (status) params.set('status', status);

      const res = await fetch(`/api/feedback?${params.toString()}`);
      const data = await res.json();
      if (data.success) setFeedback(data.data);
    } catch (error) {
      console.error('Failed to fetch feedback:', error);
    } finally {
      setLoading(false);
    }
  }, [search, category, severity, status]);

  useEffect(() => {
    const timer = setTimeout(fetchFeedback, 300);
    return () => clearTimeout(timer);
  }, [fetchFeedback]);

  return (
    <div className="page-container">
      <div className="page-header animate-fade-in-up">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
          <div>
            <h1 className="page-title">Feedback</h1>
            <p className="page-subtitle">
              Browse and filter all animal feedback reports
            </p>
          </div>
          <Link href="/feedback/new" className="btn btn-primary">
            ✏️ New Report
          </Link>
        </div>
      </div>

      <SearchFilter
        searchValue={search}
        onSearchChange={setSearch}
        filters={[
          {
            label: 'Category',
            value: category,
            onChange: setCategory,
            options: [
              { value: 'Health', label: 'Health' },
              { value: 'Behavior', label: 'Behavior' },
              { value: 'Nutrition', label: 'Nutrition' },
              { value: 'Habitat', label: 'Habitat' },
              { value: 'General', label: 'General' },
            ],
          },
          {
            label: 'Severity',
            value: severity,
            onChange: setSeverity,
            options: [
              { value: 'Low', label: 'Low' },
              { value: 'Medium', label: 'Medium' },
              { value: 'High', label: 'High' },
              { value: 'Critical', label: 'Critical' },
            ],
          },
          {
            label: 'Status',
            value: status,
            onChange: setStatus,
            options: [
              { value: 'Open', label: 'Open' },
              { value: 'In Review', label: 'In Review' },
              { value: 'Resolved', label: 'Resolved' },
              { value: 'Closed', label: 'Closed' },
            ],
          },
        ]}
      />

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner" />
        </div>
      ) : feedback.length > 0 ? (
        <>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-lg)' }}>
            {feedback.length} {feedback.length === 1 ? 'report' : 'reports'} found
          </p>
          <div className="feedback-grid stagger-children">
            {feedback.map((fb) => (
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
        </>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <h3 className="empty-state-title">No feedback found</h3>
          <p className="empty-state-description">
            {search || category || severity || status
              ? 'Try adjusting your filters or search terms.'
              : 'Be the first to submit an animal feedback report.'}
          </p>
          <Link href="/feedback/new" className="btn btn-primary">
            ✏️ Submit Feedback
          </Link>
        </div>
      )}
    </div>
  );
}
