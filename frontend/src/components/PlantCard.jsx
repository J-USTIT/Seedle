import "../styles/plantCard.css"

import LinkButton from './LinkButton.jsx'

// FUNCTION IS TO ACT AS A CARD FOR PLANTS IN DICTIONARY AND COLLECTION

function PlantCard({id, title, description}) {
    return (
        <div className="card">
            <h2>
                {title}    
            </h2>
            <p>
                {description}
            </p>
            <LinkButton to={`/plant/${id}`}>More Details</LinkButton>
        </div>
    )
}

export default PlantCard
