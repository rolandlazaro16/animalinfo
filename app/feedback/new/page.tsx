import FeedbackForm from '@/components/FeedbackForm';
import Link from 'next/link';

export const metadata = {
  title: 'Submit Feedback — AnimalInfo',
  description: 'Submit a new animal feedback or observation report.',
};

export default function NewFeedbackPage() {
  return (
    <div className="page-container">
      <Link href="/feedback" className="back-link">
        ← Back to Feedback
      </Link>

      <div className="page-header">
        <h1 className="page-title">New Feedback Report</h1>
        <p className="page-subtitle">
          Submit an observation or concern about an animal
        </p>
      </div>

      <div className="card" style={{ maxWidth: '800px' }}>
        <FeedbackForm />
      </div>
    </div>
  );
}
