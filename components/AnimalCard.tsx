import Link from 'next/link';
import StatusBadge from './StatusBadge';

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

interface AnimalCardProps {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: string;
  location: string;
  status: string;
}

export default function AnimalCard({
  id,
  name,
  species,
  breed,
  age,
  gender,
  location,
  status,
}: AnimalCardProps) {
  const emoji = speciesEmoji[species] || '🐾';

  return (
    <Link href={`/animals/${id}`} style={{ textDecoration: 'none' }}>
      <div className="animal-card">
        <div className="animal-card-image">{emoji}</div>
        <div className="animal-card-body">
          <h3 className="animal-card-name">{name}</h3>
          <p className="animal-card-species">
            {species} {breed ? `· ${breed}` : ''}
          </p>
          <div className="animal-card-details">
            <div className="animal-card-detail">
              <span>📍</span>
              <span>{location}</span>
            </div>
            <div className="animal-card-detail">
              <span>🕐</span>
              <span>{age} {age === 1 ? 'year' : 'years'} old · {gender}</span>
            </div>
          </div>
        </div>
        <div className="animal-card-footer">
          <StatusBadge type="animal-status" value={status} />
        </div>
      </div>
    </Link>
  );
}
