'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from './Toast';

interface Animal {
  _id: string;
  name: string;
}

export default function FeedbackForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    animalId: '',
    animalName: '',
    category: '',
    severity: '',
    title: '',
    description: '',
    reporterName: '',
    reporterEmail: '',
  });

  useEffect(() => {
    fetch('https://animalinfo.onrender.com/api/animals')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setAnimals(data.data);
      })
      .catch(console.error);
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.animalId) errs.animalId = 'Select an animal';
    if (!form.category) errs.category = 'Select a category';
    if (!form.severity) errs.severity = 'Select severity level';
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.description.trim()) errs.description = 'Description is required';
    if (!form.reporterName.trim()) errs.reporterName = 'Your name is required';
    if (!form.reporterEmail.trim()) errs.reporterEmail = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.reporterEmail))
      errs.reporterEmail = 'Invalid email format';
    return errs;
  };

  const handleAnimalChange = (animalId: string) => {
    const animal = animals.find((a) => a._id === animalId);
    setForm((prev) => ({
      ...prev,
      animalId,
      animalName: animal?.name || '',
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch('https://animalinfo.onrender.com/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        showToast('Feedback submitted successfully!');
        router.push('/feedback');
      } else {
        showToast(data.error || 'Failed to submit feedback', 'error');
      }
    } catch {
      showToast('An error occurred. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in-up">
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="animal-select">
            Animal
          </label>
          <select
            id="animal-select"
            className="form-select"
            value={form.animalId}
            onChange={(e) => handleAnimalChange(e.target.value)}
          >
            <option value="">Select an animal...</option>
            {animals.map((animal) => (
              <option key={animal._id} value={animal._id}>
                {animal.name}
              </option>
            ))}
          </select>
          {errors.animalId && <p className="form-error">{errors.animalId}</p>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="category-select">
            Category
          </label>
          <select
            id="category-select"
            className="form-select"
            value={form.category}
            onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
          >
            <option value="">Select category...</option>
            <option value="Health">Health</option>
            <option value="Behavior">Behavior</option>
            <option value="Nutrition">Nutrition</option>
            <option value="Habitat">Habitat</option>
            <option value="General">General</option>
          </select>
          {errors.category && <p className="form-error">{errors.category}</p>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="severity-select">
            Severity
          </label>
          <select
            id="severity-select"
            className="form-select"
            value={form.severity}
            onChange={(e) => setForm((prev) => ({ ...prev, severity: e.target.value }))}
          >
            <option value="">Select severity...</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
          {errors.severity && <p className="form-error">{errors.severity}</p>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="title-input">
            Title
          </label>
          <input
            id="title-input"
            type="text"
            className="form-input"
            placeholder="Brief summary of the feedback..."
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          />
          {errors.title && <p className="form-error">{errors.title}</p>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="description-input">
          Description
        </label>
        <textarea
          id="description-input"
          className="form-textarea"
          placeholder="Provide detailed observation or feedback..."
          value={form.description}
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
        />
        {errors.description && <p className="form-error">{errors.description}</p>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="reporter-name-input">
            Your Name
          </label>
          <input
            id="reporter-name-input"
            type="text"
            className="form-input"
            placeholder="Enter your name..."
            value={form.reporterName}
            onChange={(e) => setForm((prev) => ({ ...prev, reporterName: e.target.value }))}
          />
          {errors.reporterName && <p className="form-error">{errors.reporterName}</p>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="reporter-email-input">
            Email
          </label>
          <input
            id="reporter-email-input"
            type="email"
            className="form-input"
            placeholder="your@email.com"
            value={form.reporterEmail}
            onChange={(e) => setForm((prev) => ({ ...prev, reporterEmail: e.target.value }))}
          />
          {errors.reporterEmail && <p className="form-error">{errors.reporterEmail}</p>}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-xl)' }}>
        <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
          {loading ? 'Submitting...' : '✓ Submit Feedback'}
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-lg"
          onClick={() => router.back()}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
