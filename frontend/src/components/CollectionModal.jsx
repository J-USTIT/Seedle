import '../styles/collection.css';

function CollectionModal({ item, onClose }) {
    if (!item) return null;

    const { plant, collection } = item;
    const familyName = plant.family?.common_name || plant.family || 'Unknown family';
    const answeredAt = collection?.answeredAt ? new Date(collection.answeredAt).toLocaleDateString() : 'Unknown';
    const timeSeconds = collection?.timeSeconds ?? 0;
    const attempts = collection?.guessesUsed ?? 0;

    return (
        <div className="collection-modal-overlay" onClick={onClose}>
            <div className="collection-modal" onClick={(e) => e.stopPropagation()}>
                <button className="collection-modal__close" onClick={onClose}>
                    ×
                </button>
                <div className="collection-modal__hero">
                    {plant.imageUrl ? (
                        <img src={plant.imageUrl} alt={plant.commonName || plant.scientificName} />
                    ) : (
                        <div className="collection-modal__placeholder">No image</div>
                    )}
                </div>
                <div className="collection-modal__content">
                    <h2>{plant.commonName || 'Unknown plant'}</h2>
                    <p className="collection-modal__scientific">{plant.scientificName}</p>
                    <p className="collection-modal__family">{familyName}</p>
                    <div className="collection-modal__stats">
                        <p>You answered this for: <strong>{timeSeconds} second{timeSeconds === 1 ? '' : 's'}</strong></p>
                        <p>On: <strong>{answeredAt}</strong></p>
                        <p>For: <strong>{attempts} attempt{attempts === 1 ? '' : 's'}</strong></p>
                    </div>
                    <div className="collection-modal__extra">
                        <p><strong>Plant ID</strong>: {plant.trefleId}</p>
                        <p><strong>Slug</strong>: {plant.slug}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CollectionModal;
