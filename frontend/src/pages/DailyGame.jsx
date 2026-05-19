import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch.js";
import { useAuth } from "../context/AuthContext.jsx";
import axiosInstance from "../utils/axiosInstance.js";
import { startSession, loadSession, saveGuess, getElapsedSeconds, saveResult, isSessionFromToday, clearSession } from "../utils/guessStorage.js";

function DailyGame() {
    
    // AT START SHOULD CHECK IF PLAYER HAS PLAYED
    
    const [query, setQuery] = useState("");
    const [guesses, setGuesses] = useState([]);
    const [result, setResult] = useState(null);
    const [roundId, setRoundId] = useState(null);
    const [statusMessage, setStatusMessage] = useState("");
    const [alreadyCompleted, setAlreadyCompleted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { isAuthenticated, user } = useAuth();
    
    const endpoint = query ? `http://localhost:8000/api/plants/search?q=${query}&s=asc` : `http://localhost:8000/api/plants`;
    const [plantList] = useFetch(endpoint);

    useEffect(()=>{
        const initSession = async () => {
            try {
                const { data } = await axiosInstance.get('/activegame/status');
                const id = data?.activeRoundId;

                setRoundId(id);

                if (!isSessionFromToday(id, user?.userId)) {
                    clearSession(id, user?.userId);
                }

                startSession(id, user?.userId);
                const session = loadSession(id, user?.userId);
                if (session?.guesses.length > 0) {
                    setGuesses(session.guesses);
                    setResult(session.result);
                }

                if (data?.completed) {
                    setAlreadyCompleted(true);
                    setResult(prev => prev || { correct: true });
                }
            } catch (error) {
                console.error("Error loading active game status:", error);
                setStatusMessage("Unable to load game status. Please refresh.");
            }
        };

        if (isAuthenticated && user?.userId) {
            initSession();
        }
    }, [isAuthenticated, user?.userId])

    const onSubmit = async (e) => {
        e.preventDefault();
        
        const guess = parseInt(e.target.guess.value);

        setIsSubmitting(true);
        try {
            const { data: response } = await axiosInstance.post('/guess', {
                guess,
                guessesUsed: guesses.length + 1,
                timeSeconds: getElapsedSeconds(roundId, user?.userId),
            });

            const { data: plantGuess } = await axiosInstance.get(`/plant/${guess}`);

            const newGuess = { id: guesses.length, value: plantGuess.data, correct: response.correct , hints: response.hints }
            
            saveGuess(roundId, user?.userId, newGuess);
            setGuesses(prev => [...prev, newGuess]);
            
            saveResult(roundId, user?.userId, response);
            setResult(response);
        } catch (error) {
            console.error(error);
            const apiMessage = error.response?.data?.message;
            if (error.response?.status === 409) {
                setAlreadyCompleted(true);
                setResult({ correct: true });
            }
            if (apiMessage) {
                setStatusMessage(apiMessage);
            } else {
                setStatusMessage("There was a problem submitting your guess.");
            }
        } finally {
            setIsSubmitting(false);
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

    // Show the congrats alert only once per user+round (prevents repeated alerts)
    useEffect(() => {
        if (!result?.correct) return;
        if (!roundId) return;

        const key = `seedle_congrats_${user?.userId || 'guest'}_${roundId}`;
        if (sessionStorage.getItem(key)) return;

        sessionStorage.setItem(key, '1');
        alert("CONGRATS YOU WON!!! DO REPLACE THIS WITH A PROPER DIALOG :)");
    }, [result?.correct, roundId, user?.userId]);

    return (
        <>
            <h1>Daily Game</h1>

            <form id="guessForm" onSubmit={onSubmit} >
                {statusMessage && <div className="mb-4 text-sm text-amber-700">{statusMessage}</div>}
                <input type="text" value={query} onChange={(e)=> setQuery(e.target.value)} disabled={ result?.correct || alreadyCompleted } />
                <select id="guess" name="guess" disabled={!plantList || result?.correct || alreadyCompleted}>
                    { plantList ? plantList?.data?.filter((plant) => !guesses.some((guess) => guess.value.id === plant.id))?.map((plant) => 
                        <option key={plant.id} value={plant.id}>{plant.common_name}</option>
                    ) : <option>Loading...</option>} 
                </select>
                <input type="submit" value="Submit" disabled={result?.correct || alreadyCompleted || isSubmitting} />
            </form>

            <table>
                {alreadyCompleted && <caption className="text-left text-sm text-emerald-800 mb-2">This game has already been completed for today. {/* can remove this */}</caption>}
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
                        guesses.length === 0 ? <tr><td colSpan={8}>Enter a guess</td></tr> : guesses.map(({value: plant, hints})=>
                            <tr key={plant.id || plant.slug || `${plant.common_name}-${hints?.length}`}>
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
