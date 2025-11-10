import { useState } from 'react';
import { createTrip } from '../services/api';
import './TripForm.css';

function TripForm({ onTripAdded }) {
  const [formData, setFormData] = useState({
    userName: '',
    location: '',
    description: '',
    tripDate: new Date().toISOString().split('T')[0],
    photo: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        photo: file
      }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const tripDate = new Date(formData.tripDate).toISOString();
      await createTrip({
        ...formData,
        tripDate
      });
      
      setFormData({
        userName: '',
        location: '',
        description: '',
        tripDate: new Date().toISOString().split('T')[0],
        photo: null
      });
      setPreviewUrl(null);
      
      if (onTripAdded) {
        onTripAdded();
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create trip. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="trip-form-container">
      <h2>Share Where You Just Went</h2>
      <form onSubmit={handleSubmit} className="trip-form">
        <div className="form-group">
          <label htmlFor="userName">Your Name</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location *</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Where did you go?"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tripDate">Date</label>
          <input
            type="date"
            id="tripDate"
            name="tripDate"
            value={formData.tripDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell us about your experience..."
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="photo">Photo</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handlePhotoChange}
          />
          {previewUrl && (
            <div className="photo-preview">
              <img src={previewUrl} alt="Preview" />
            </div>
          )}
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? 'Sharing...' : 'Share Your Trip'}
        </button>
      </form>
    </div>
  );
}

export default TripForm;

