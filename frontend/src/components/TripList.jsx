import { useEffect, useState } from 'react';
import { getTrips } from '../services/api';
import TripCard from './TripCard';
import './TripList.css';

function TripList({ refreshTrigger }) {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const data = await getTrips();
      setTrips(data);
      setError(null);
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Unknown error';
      setError(`Failed to load trips: ${errorMessage}`);
      console.error('Error loading trips:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [refreshTrigger]);

  if (loading) {
    return <div className="loading">Loading trips...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (trips.length === 0) {
    return <div className="empty-state">No trips yet. Be the first to share!</div>;
  }

  return (
    <div className="trip-list">
      <h2>Recent Trips</h2>
      <div className="trips-grid">
        {trips.map(trip => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
}

export default TripList;

