'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import StatusBadge from '@/components/StatusBadge';
import FeedbackCard from '@/components/FeedbackCard';

const speciesEmoji: Record<string, string> = {
  Lion: '🦁',
  Zebra: '🦓',
  Elephant: '🐘',
  Leopard: '🐆',
  Rhinoceros: '🦏',
  Cheetah: '🐆',
  Hippopotamus: '🦛',
  Giraffe: '🦒',
  Gorilla: '🦍',
  Flamingo: '🦩',
  Eagle: '🦅',
  Dolphin: '🐬',
  Tiger: '🐯',
  Bear: '🐻',
  Wolf: '🐺',
  Penguin: '🐧',
};

interface Animal {
  _id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: string;
  location: string;
  status: string;
  createdAt: string;
}

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

export default function AnimalDetailPage() {
  const params = useParams();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [animalRes, feedbackRes] = await Promise.all([
          fetch(`/api/animals/${params.id}`),
          fetch(`/api/feedback?animalId=${params.id}`),
        ]);

        const animalData = await animalRes.json();
        const feedbackData = await feedbackRes.json();

        if (animalData.success) setAnimal(animalData.data);
        if (feedbackData.success) setFeedback(feedbackData.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-spinner">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <div className="empty-state-icon">❓</div>
          <h3 className="empty-state-title">Animal not found</h3>
          <p className="empty-state-description">
            This animal may have been removed from the system.
          </p>
          <Link href="/animals" className="btn btn-primary">
            ← Back to Animals
          </Link>
        </div>
      </div>
    );
  }

  const emoji = speciesEmoji[animal.species] || '🐾';

  return (
    <div className="page-container animate-fade-in-up">
      <Link href="/animals" className="back-link">
        ← Back to Animals
      </Link>

      <div className="animal-profile-header">
        <div className="animal-profile-image">{emoji}</div>
        <div className="animal-profile-info">
          <h1 className="animal-profile-name">{animal.name}</h1>
          <p className="animal-profile-species">
            {animal.species} {animal.breed ? `· ${animal.breed}` : ''}
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)', flexWrap: 'wrap' }}>
            <StatusBadge type="animal-status" value={animal.status} />
          </div>

          <div className="animal-profile-stats">
            <div className="animal-profile-stat">
              <div className="animal-profile-stat-value">{animal.age}</div>
              <div className="animal-profile-stat-label">Years Old</div>
            </div>
            <div className="animal-profile-stat">
              <div className="animal-profile-stat-value">{feedback.length}</div>
              <div className="animal-profile-stat-label">Reports</div>
            </div>
            <div className="animal-profile-stat">
              <div className="animal-profile-stat-value">{animal.gender}</div>
              <div className="animal-profile-stat-label">Gender</div>
            </div>
          </div>
        </div>
      </div>

      <div className="detail-info-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: 'var(--space-2xl)' }}>
        <div className="detail-info-item">
          <div className="detail-info-label">Location</div>
          <div className="detail-info-value">📍 {animal.location}</div>
        </div>
        <div className="detail-info-item">
          <div className="detail-info-label">Registered</div>
          <div className="detail-info-value">
            {new Date(animal.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>
        <div className="detail-info-item">
          <div className="detail-info-label">Species</div>
          <div className="detail-info-value">{animal.species}</div>
        </div>
      </div>

      <div className="section-header">
        <h2 className="section-title">Feedback History</h2>
        <Link href={`/feedback/new`} className="btn btn-secondary btn-sm">
          ✏️ Add Feedback
        </Link>
      </div>

      {feedback.length > 0 ? (
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
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <h3 className="empty-state-title">No feedback yet</h3>
          <p className="empty-state-description">
            No feedback has been submitted for {animal.name} yet.
          </p>
          <Link href="/feedback/new" className="btn btn-primary">
            ✏️ Submit First Feedback
          </Link>
        </div>
      )}
    </div>
  );
}
