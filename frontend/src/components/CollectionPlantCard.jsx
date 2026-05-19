import '../styles/collection.css';

function CollectionPlantCard({ plant, collected, onClick }) {
    const familyName = plant.family?.common_name || plant.family || 'Unknown family';
    return (
        <article
            className={`collection-card ${collected ? 'collected' : 'uncollected'}`}
            onClick={collected ? onClick : undefined}
            role={collected ? 'button' : 'article'}
            tabIndex={collected ? 0 : -1}
        >
            <div className="collection-card__image-wrapper">
                {plant.imageUrl ? (
                    <img src={plant.imageUrl} alt={plant.commonName || plant.scientificName} />
                ) : (
                    <div className="collection-card__placeholder">No image</div>
                )}
            </div>
            <div className="collection-card__body">
                <p className="collection-card__status">
                    {collected ? 'Collected' : 'Uncollected'}
                </p>
                <h3>{plant.commonName || 'Unknown name'}</h3>
                <p className="collection-card__scientific">{plant.scientificName}</p>
                <p className="collection-card__family">{familyName}</p>
            </div>
        </article>
    );
}

export default CollectionPlantCard;
