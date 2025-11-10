import './PhotoModal.css';

function PhotoModal({ photoUrl, location, onClose }) {
  if (!photoUrl) return null;

  return (
    <div className="photo-modal-overlay" onClick={onClose}>
      <div className="photo-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="photo-modal-close" onClick={onClose}>
          ×
        </button>
        <img src={photoUrl} alt={location} className="photo-modal-image" />
        <p className="photo-modal-location">{location}</p>
      </div>
    </div>
  );
}

export default PhotoModal;

