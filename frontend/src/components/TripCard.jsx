import { useState } from 'react';
import PhotoModal from './PhotoModal';
import './TripCard.css';

function TripCard({ trip }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handlePhotoClick = () => {
    if (trip.photoUrl) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="trip-card">
        {trip.photoUrl && (
          <div className="trip-photo" onClick={handlePhotoClick}>
            <img src={trip.photoUrl} alt={trip.location} />
            <div className="trip-photo-overlay">
              <span className="trip-photo-hint">Click to expand</span>
            </div>
          </div>
        )}
        <div className="trip-content">
          <h3 className="trip-location">{trip.location}</h3>
          <div className="trip-meta">
            <span className="trip-user">by {trip.userName}</span>
            <span className="trip-date">{formatDate(trip.tripDate)}</span>
          </div>
          {trip.description && (
            <p className="trip-description">{trip.description}</p>
          )}
        </div>
      </div>
      {isModalOpen && (
        <PhotoModal
          photoUrl={trip.photoUrl}
          location={trip.location}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

export default TripCard;

