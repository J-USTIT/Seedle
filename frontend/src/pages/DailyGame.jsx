import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch.js";
import axios from 'axios';
import { startSession, loadSession, saveGuess, getElapsedSeconds, saveResult, isSessionFromToday, clearSession } from "../utils/guessStorage.js";

function DailyGame() {
    
    // AT START SHOULD CHECK IF PLAYER HAS PLAYED
    
    const [query, setQuery] = useState("");
    const [guesses, setGuesses] = useState([]);
    const [result, setResult] = useState(null);
    const [roundId, setRoundId] = useState(null);
    
    const endpoint = query ? `http://localhost:8000/api/plants/search?q=${query}&s=asc` : `http://localhost:8000/api/plants`;
    const [plantList] = useFetch(endpoint);

    useEffect(()=>{
        const initSession = async () => {
            const { data } = await axios.get('http://localhost:8001/api/activegame');
            const { _id: id } = await data;

            setRoundId(id);

            if (!isSessionFromToday(id)) {
                clearSession(id); 
            }
            
            startSession(id);
            const session = loadSession(id);
            if(session?.guesses.length > 0) {
                setGuesses(session.guesses);
                setResult(session.result);
            }
        };

        initSession();
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
        
        const guess = parseInt(e.target.guess.value); // in ID

        try {
            const { data: response } = await axios.post('http://localhost:8000/api/guess', {
                guess,
                guessesUsed: guesses.length + 1,
                timeSeconds: getElapsedSeconds(roundId),
            });

            // USE API TO RETRIEVE DATA FROM BACKEND CACHE
            const { data: plantGuess } = await axios.get(`http://localhost:8000/api/plant/${guess}`);
            console.log(plantGuess.data);

            // const plantGuess = plantList.data.find(plant => plant.id === guess);
            // console.log("Plant Guess:", plantGuess);

            const newGuess = { id: guesses.length, value: plantGuess.data, correct: response.correct , hints: response.hints }
            
            saveGuess(roundId, newGuess);
            setGuesses(prev => [...prev, newGuess]);
            
            saveResult(roundId, response);
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

    const tempIncorrectGuessStyle = {
        backgroundColor: "red",
    }

    const tempCorrectGuessStyle = {
        backgroundColor: "green",
    }

    if(result?.correct){
        alert("CONGRATS YOU WON!!! DO REPLACE THIS WITH A PROPER DIALOG :)");
    }

    return (
        <>
            <h1>Daily Game</h1>

            <form id="guessForm" onSubmit={onSubmit} >
                <input type="text" value={query} onChange={(e)=> setQuery(e.target.value)} disabled={ result?.correct } />
                <select id="guess" name="guess" disabled={!plantList || result?.correct}>
                    { plantList ? plantList?.data?.filter((plant) => !guesses.some((guess) => guess.value.id === plant.id))?.map((plant) => 
                        <option key={plant.id} value={plant.id}>{plant.common_name}</option>
                    ) : <option>Loading...</option>} 
                </select>
                <input type="submit" value="Submit" disabled={result?.correct} />
            </form>

            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Common Name</th>
                        <th>Family</th>
                        <th>Genus</th>
                        <th>Edible</th>
                        <th>Vegetable</th>
                        <th>Observations</th>
                        <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        guesses.length === 0 ? <tr><td colSpan={5}>Enter a guess</td></tr> : guesses.map(({value: plant, hints})=>
                            <tr>
                                <td>
                                    <img src={plant.image_url} style={tempStyle}/>
                                </td>
                                <td style={hints[0] ? tempCorrectGuessStyle : tempIncorrectGuessStyle }>
                                    {plant.common_name}
                                </td>
                                <td style={hints[1] ? tempCorrectGuessStyle : tempIncorrectGuessStyle }>
                                    {plant.family}
                                </td>
                                <td style={hints[2] ? tempCorrectGuessStyle : tempIncorrectGuessStyle }>
                                    {plant.genus}
                                </td>
                                <td style={hints[3] ? tempCorrectGuessStyle : tempIncorrectGuessStyle }>
                                    {plant.edible?.toString()}
                                </td>
                                <td style={hints[4] ? tempCorrectGuessStyle : tempIncorrectGuessStyle }>
                                    {plant.vegetable?.toString()}
                                </td>
                                <td style={hints[5] ? tempCorrectGuessStyle : tempIncorrectGuessStyle }>
                                    {plant.observations}
                                </td>
                                <td style={hints[6]?.isCorrect ? tempCorrectGuessStyle : tempIncorrectGuessStyle }>
                                    {plant.year}
                                    {hints[6]?.isCorrect ? " - " : hints[6]?.isHigher ? " \u2191 " : " \u2192 "}
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>

            {/* WIN COMPONENT */}
        </>
    )
}

export default DailyGame
