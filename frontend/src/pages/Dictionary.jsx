import { useState, useEffect } from "react"
import PlantCard from "../components/PlantCard.jsx"
import LinkButton from "../components/LinkButton.jsx";
import useFetch from "../hooks/useFetch.js";

function Dictionary() {
    const [plantsData, setPlantsData] = useState(null);
    const [query, setQuery] = useState("");
    // const [loading, setLoading] = useState(true);

    // useEffect(()=> {
    //     async function getAllPlants() {
    //         // DO THIS :query on route then something.params.query on server.js
    //         console.log(`http://localhost:8001/api/plants/${query}`);
    //         const response = await fetch(`http://localhost:8001/api/plants/${query}`);
    //         const json = await response.json();

    //         setPlantsData(json.data);
    //         console.log(json.data);
    //         setLoading(false);
    //     }
    //     console.log(query);
    //     getAllPlants();
    // }, [query])

    const [data] = useFetch(`http://localhost:8001/api/plants/${query}`);
    console.log(data);

    return (
        <>
            <h1>
                Dictionary
            </h1>
            <LinkButton to="/home">Home</LinkButton>
            <form onSubmit={(e)=>{e.preventDefault();}}>
                <input 
                    type="text"
                    onKeyUp={(e)=>{
                        if(e.key === 'Enter') setQuery(e.target.value);
                    }}
                />
            </form>
            { data !== null ? data.data.map((plant) => 
                <PlantCard key={plant.id} id={plant.id} title={plant.scientific_name} description={plant.common_name} />) : "Loading..."
            }
        </>
    )
}

export default Dictionary
