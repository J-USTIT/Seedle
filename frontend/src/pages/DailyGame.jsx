import { useState } from "react";
import useFetch from "../hooks/useFetch.js";
import axios from 'axios';

function DailyGame() {
    
    // AT START SHOULD CHECK IF PLAYER HAS PLAYED
    
    const [query, setQuery] = useState("");
    const [guesses, setGuesses] = useState([]);
    const [result, setResult] = useState(null);
    
    const endpoint = query ? `http://localhost:8001/api/plants/search?q=${query}&s=asc` : `http://localhost:8001/api/plants`;
    const [plantList] = useFetch(endpoint);
    
    const onSubmit = async (e) => {
        e.preventDefault();
        
        const guess = parseInt(e.target.guess.value); // in ID

        try {
            const { data: response } = await axios.post('http://localhost:8001/api/guess', {
                guess,
            });

            // USE API TO RETRIEVE DATA FROM BACKEND CACHE
            const { data: plantGuess } = await axios.get(`http://localhost:8001/api/plant/${guess}`);
            console.log(plantGuess.data);

            // const plantGuess = plantList.data.find(plant => plant.id === guess);
            // console.log("Plant Guess:", plantGuess);

            const newGuess = { id: guesses.length, value: plantGuess.data, correct: response.correct }
            setGuesses(prev => [...prev, newGuess]);
            setResult(response);

        } catch (error) {
            console.log(error);
        }
        
    }

    const tempStyle = {
        aspectRatio: "1/1", 
        width: "150px", 
        height: "150px", 
        objectFit:"cover" 
    };

    return (
        <>
            <h1>Daily Game</h1>

            <form id="guessForm" onSubmit={onSubmit}>
                {/* THIS WILL TURN INTO A SEARCH */}

                {/* DISABLES SUBMIT WHEN FULL */}
                <input type="text" value={query} onChange={(e)=> setQuery(e.target.value)} />
                <select id="guess" name="guess" disabled={!plantList}>
                    {/* ADD FILTER BEFORE MAPPING TO REMOVE GUESSED PLANTS */}
                    { plantList ? plantList?.data?.map((plant) => 
                        <option key={plant.id} value={plant.id}>{plant.common_name}</option>
                    ) : <option>Loading...</option>} 
                </select>
                {/* ADD SELECT AND OPTION, REQUIRES TO BE SELECTED */}
                <input type="submit" value="Submit" />
            </form>

            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Common Name</th>
                        <th>Family</th>
                        <th>Genus</th>
                        <th>Ligneous Type</th>
                        <th>Native</th>
                        <th>Observations</th>
                        <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        guesses.length === 0 ? <tr><td colSpan={5}>Enter a guess</td></tr> : guesses.map(({value: plant})=>
                            <tr>
                                <td>
                                    <img src={plant.image_url} style={tempStyle}/>
                                </td>
                                <td>
                                    {plant.common_name}
                                </td>
                                <td>
                                    {plant.family}
                                </td>
                                <td>
                                    {plant.genus}
                                </td>
                                <td>
                                    {plant.edible?.toString()}
                                </td>
                                <td>
                                    {plant.vegetable?.toString()}
                                </td>
                                <td>
                                    {plant.observations}
                                </td>
                                <td>
                                    {plant.year}
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    )
}

export default DailyGame
