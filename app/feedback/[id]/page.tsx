'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import StatusBadge from '@/components/StatusBadge';
import { useToast } from '@/components/Toast';

interface FeedbackDetail {
  _id: string;
  animalId: string;
  animalName: string;
  category: string;
  severity: string;
  title: string;
  description: string;
  reporterName: string;
  reporterEmail: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function FeedbackDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const [feedback, setFeedback] = useState<FeedbackDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch(`/api/feedback/${params.id}`);
        const data = await res.json();
        if (data.success) {
          setFeedback(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch feedback:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedback();
  }, [params.id]);

  const handleStatusChange = async (newStatus: string) => {
    try {
      const res = await fetch(`/api/feedback/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setFeedback(data.data);
        showToast(`Status updated to ${newStatus}`);
      }
    } catch {
      showToast('Failed to update status', 'error');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this feedback?')) return;
    try {
      const res = await fetch(`/api/feedback/${params.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast('Feedback deleted');
        router.push('/feedback');
      }
    } catch {
      showToast('Failed to delete feedback', 'error');
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

  if (!feedback) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <div className="empty-state-icon">❓</div>
          <h3 className="empty-state-title">Feedback not found</h3>
          <p className="empty-state-description">
            This feedback entry may have been deleted.
          </p>
          <Link href="/feedback" className="btn btn-primary">
            ← Back to Feedback
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container animate-fade-in-up">
      <Link href="/feedback" className="back-link">
        ← Back to Feedback
      </Link>

      <div className="detail-header">
        <div>
          <h1 className="detail-title">{feedback.title}</h1>
          <div className="detail-meta">
            <StatusBadge type="category" value={feedback.category} />
            <StatusBadge type="severity" value={feedback.severity} />
            <StatusBadge type="status" value={feedback.status} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
          <button className="btn btn-danger btn-sm" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <div className="detail-body">
        <div>
          <div className="detail-section">
            <h2 className="detail-section-title">Description</h2>
            <p className="detail-description">{feedback.description}</p>
          </div>

          <div className="detail-section">
            <h2 className="detail-section-title">Update Status</h2>
            <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
              {['Open', 'In Review', 'Resolved', 'Closed'].map((s) => (
                <button
                  key={s}
                  className={`btn btn-sm ${feedback.status === s ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => handleStatusChange(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="detail-info-grid">
            <div className="detail-info-item">
              <div className="detail-info-label">Animal</div>
              <div className="detail-info-value">
                <Link
                  href={`/animals/${feedback.animalId}`}
                  style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}
                >
                  🐾 {feedback.animalName}
                </Link>
              </div>
            </div>

            <div className="detail-info-item">
              <div className="detail-info-label">Reporter</div>
              <div className="detail-info-value">{feedback.reporterName}</div>
            </div>

            <div className="detail-info-item">
              <div className="detail-info-label">Email</div>
              <div className="detail-info-value" style={{ wordBreak: 'break-all' }}>
                {feedback.reporterEmail}
              </div>
            </div>

            <div className="detail-info-item">
              <div className="detail-info-label">Submitted</div>
              <div className="detail-info-value">
                {new Date(feedback.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>

            <div className="detail-info-item">
              <div className="detail-info-label">Last Updated</div>
              <div className="detail-info-value">
                {new Date(feedback.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
