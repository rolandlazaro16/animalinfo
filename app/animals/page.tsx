'use client';

import { useEffect, useState, useCallback } from 'react';
import AnimalCard from '@/components/AnimalCard';
import SearchFilter from '@/components/SearchFilter';

interface Animal {
  _id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: string;
  location: string;
  status: string;
}

export default function AnimalsPage() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const fetchAnimals = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (status) params.set('status', status);

      const res = await fetch(`/api/animals?${params.toString()}`);
      const data = await res.json();
      if (data.success) setAnimals(data.data);
    } catch (error) {
      console.error('Failed to fetch animals:', error);
    } finally {
      setLoading(false);
    }
  }, [search, status]);

  useEffect(() => {
    const timer = setTimeout(fetchAnimals, 300);
    return () => clearTimeout(timer);
  }, [fetchAnimals]);

  return (
    <div className="page-container">
      <div className="page-header animate-fade-in-up">
        <h1 className="page-title">Animals</h1>
        <p className="page-subtitle">
          Browse all registered animals in the system
        </p>
      </div>

      <SearchFilter
        searchValue={search}
        onSearchChange={setSearch}
        filters={[
          {
            label: 'Status',
            value: status,
            onChange: setStatus,
            options: [
              { value: 'Healthy', label: 'Healthy' },
              { value: 'Needs Attention', label: 'Needs Attention' },
              { value: 'Critical', label: 'Critical' },
            ],
          },
        ]}
      />

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner" />
        </div>
      ) : animals.length > 0 ? (
        <>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-lg)' }}>
            {animals.length} {animals.length === 1 ? 'animal' : 'animals'} registered
          </p>
          <div className="animal-grid stagger-children">
            {animals.map((animal) => (
              <AnimalCard
                key={animal._id}
                id={animal._id}
                name={animal.name}
                species={animal.species}
                breed={animal.breed}
                age={animal.age}
                gender={animal.gender}
                location={animal.location}
                status={animal.status}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">🐾</div>
          <h3 className="empty-state-title">No animals found</h3>
          <p className="empty-state-description">
            {search || status
              ? 'Try adjusting your search or filters.'
              : 'Seed the database to add sample animals.'}
          </p>
        </div>
      )}
    </div>
  );
}
