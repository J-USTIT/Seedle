import { useState, useEffect } from "react"
import PlantCard from "../components/PlantCard.jsx"
import LinkButton from "../components/LinkButton.jsx";
import useFetch from "../hooks/useFetch.js";
import Loading from "../components/Loading.jsx";
import Search from "../components/Search.jsx";
import Filter from "../components/Filter.jsx";
import Sorting from "../components/Sorting.jsx";

function PlantCollection() {
    // FIRST CHECK FOR USER ID (AUTHENTICATION)
    // IF USER, THEN GET ID AND FETCH USER DATA ALONGSIDE PLANTS
    // ELSE, REDIRECT INTO LOGIN WITH MESSAGE WHY

    const [plantsData, setPlantsData] = useState(null);
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("");
    const [sorting, setSorting] = useState("asc");

    const endpoint = query ? `http://localhost:8001/api/plants/search?q=${query}&f=${filter}&s=${sorting}` : `http://localhost:8001/api/plants`;
    const [data] = useFetch(endpoint);

    useEffect(()=>{console.log(query, filter, sorting)}, [query, filter, sorting]);

    return (
        <div>
            <h1>Plant Collections</h1>
            <LinkButton to="/home">Home</LinkButton>
            <form onSubmit={ (e) => { e.preventDefault() }}>
                <Search setQuery={setQuery} />
                <Filter setFilter={setFilter} >
                    <option value="test" default>Meow</option>
                    <option value="green">Green</option>
                    <option value="banana">Banana</option>
                </Filter>
                <Sorting setSorting={setSorting} >
                    <option value="asc" default>A-Z</option>
                    <option value="desc">Z-A</option>
                </Sorting>
            </form>

            { data !== null ? data.data?.map((plant) => 
                <PlantCard key={plant.id} id={plant.id} title={plant.scientific_name} description={plant.common_name} />) : <Loading />
            }
        </div>
    )
}

export default PlantCollection
