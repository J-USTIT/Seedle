import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch.js";
import { useAuth } from "../context/AuthContext.jsx";
import axiosInstance from "../utils/axiosInstance.js";
import { startSession, loadSession, saveGuess, getElapsedSeconds, saveResult, isSessionFromToday, clearSession } from "../utils/guessStorage.js";


function DailyGame() {
    
    const [query, setQuery] = useState("");
    const [guesses, setGuesses] = useState([]);
    const [result, setResult] = useState(null);
    const [roundId, setRoundId] = useState(null);
    const [statusMessage, setStatusMessage] = useState("");
    const [alreadyCompleted, setAlreadyCompleted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { isAuthenticated, user } = useAuth();
    
    const endpoint = query ? `/plants/search?q=${query}&s=asc` : `/plants`;
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
        // alert("CONGRATS YOU WON!!! DO REPLACE THIS WITH A PROPER DIALOG :)");
    }, [result?.correct, roundId, user?.userId]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[85vh] bg-gradient-to-br from-[#f4f9f4] to-[#e2f0e6] bg-game-grid p-4 sm:p-6 font-sans relative">
            
            <div className="w-full max-w-[1200px] bg-[#F3F0E6]/95 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(46,125,50,0.15)] border-4 border-b-[8px] border-white/80 p-6 sm:p-10 relative overflow-hidden mt-8 text-emerald-900 animate-fade-in-up">
                
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-200/30 rounded-full blur-3xl animate-float pointer-events-none"></div>
                <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-green-200/30 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>

                <div className="relative z-10">
                    <div className="mb-10 text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-900 tracking-tight mb-2 text-game-shadow">
                            Daily Game 🌿
                        </h1>
                        <p className="text-emerald-800/80 text-sm font-bold tracking-wide">
                            GUESS THE PLANT OF THE DAY &bull; ATTEMPTS: {guesses.length}
                        </p>
                    </div>

                    {result?.correct && (
                        <div className="mb-8 p-4 bg-gradient-to-r from-yellow-200 to-amber-200 border-4 border-b-[8px] border-amber-500 rounded-2xl text-center shadow-lg animate-bounce">
                            <h2 className="text-3xl font-black text-amber-800 uppercase tracking-widest">Victory! 🏆</h2>
                            <p className="text-amber-700 font-bold mt-1 text-lg">You guessed the plant in {guesses.length} attempts!</p>
                        </div>
                    )}

                    <form id="guessForm" onSubmit={onSubmit} className="flex flex-col md:flex-row gap-4 mb-10 max-w-4xl mx-auto justify-center">
                        {statusMessage && <div className="mb-4 text-sm text-amber-700">{statusMessage}</div>}
                        <input 
                            type="text" 
                            value={query} 
                            placeholder="Search plants..."
                            onChange={(e)=> setQuery(e.target.value)} 
                            disabled={ result?.correct || alreadyCompleted }
                            className="flex-1 px-5 py-3 rounded-2xl border-2 border-b-[6px] border-emerald-300 bg-emerald-50 focus:outline-none focus:ring-0 focus:border-emerald-500 text-emerald-900 font-bold placeholder-emerald-400 disabled:opacity-60 transition-all"
                        />
                        
                        <select 
                            id="guess" 
                            name="guess" 
                            disabled={!plantList || result?.correct || alreadyCompleted }
                            className="flex-1 px-5 py-3 rounded-2xl border-2 border-b-[6px] border-emerald-300 bg-emerald-50 focus:outline-none focus:ring-0 focus:border-emerald-500 text-emerald-900 font-bold disabled:opacity-60 cursor-pointer transition-all"
                        >
                            { plantList ? (() => {
                                const filteredPlants = plantList?.data
                                    ?.filter((plant) => plant.common_name)
                                    ?.filter((plant) => !guesses.some((guess) => guess.value.id === plant.id));
                                
                                return filteredPlants?.length > 0 ? (
                                    filteredPlants.map((plant) => 
                                        <option key={plant.id} value={plant.id}>{plant.common_name}</option>
                                    )
                                ) : (
                                    <option disabled>No search results</option>
                                );
                            })() : <option>Loading...</option>} 
                        </select>
                        
                        <button 
                            type="submit" 
                            disabled={result?.correct || alreadyCompleted || isSubmitting}
                            className="px-8 py-3 rounded-2xl bg-emerald-500 text-white font-black uppercase tracking-wider border-2 border-b-[6px] border-emerald-700 hover:bg-emerald-400 hover:border-emerald-600 hover:-translate-y-1 active:border-b-2 active:translate-y-1 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center gap-2 justify-center"
                        >
                            🌱 Submit Guess
                        </button>
                    </form>

                    <div className="overflow-x-auto rounded-2xl border border-emerald-100 shadow-sm bg-white/50 backdrop-blur-sm">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            {/* {alreadyCompleted && <caption className="text-left text-sm text-emerald-800 mb-2">This game has already been completed for today. can remove this</caption>} */}
                            <thead>
                                <tr className="bg-emerald-700 text-emerald-50 text-xs sm:text-sm uppercase tracking-widest font-black border-b-4 border-emerald-900 font-mono shadow-inner">
                                    <th className="px-4 py-4"></th>
                                    <th className="px-4 py-4">Common Name</th>
                                    <th className="px-4 py-4">Family</th>
                                    <th className="px-4 py-4">Genus</th>
                                    <th className="px-4 py-4">Edible</th>
                                    <th className="px-4 py-4">Vegetable</th>
                                    <th className="px-4 py-4">Observations</th>
                                    <th className="px-4 py-4">Year</th>
                                </tr>
                            </thead>
                            <tbody className="text-emerald-900 text-sm md:text-base font-mono font-medium">
                                {
                                    guesses.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} className="text-center py-12 text-emerald-600/50 font-medium italic">
                                                Enter a guess to begin.
                                            </td>
                                        </tr>
                                    ) : guesses.map(({value: plant, hints}, index)=>
                                        <tr key={index} className="border-b-[3px] border-emerald-200/50 hover:bg-white/50 transition-colors">
                                            <td className="px-4 py-3 bg-white/40">
                                                <div className="w-20 h-20 min-w-[5rem] min-h-[5rem] rounded-xl overflow-hidden shadow-sm flex items-center justify-center">
                                                    <img src={plant.image_url} alt={plant.common_name} className="w-full h-full object-cover aspect-square" />
                                                </div>
                                            </td>
                                            <td className={`px-4 py-3 ${hints[0] ? 'bg-emerald-100/70' : 'bg-rose-100/70'}`}>
                                                {plant.common_name}
                                            </td>
                                            <td className={`px-4 py-3 ${hints[1] ? 'bg-emerald-100/70' : 'bg-rose-100/70'}`}>
                                                {plant.family}
                                            </td>
                                            <td className={`px-4 py-3 ${hints[2] ? 'bg-emerald-100/70' : 'bg-rose-100/70'}`}>
                                                {plant.genus}
                                            </td>
                                            <td className={`px-4 py-3 ${hints[3] ? 'bg-emerald-100/70' : 'bg-rose-100/70'}`}>
                                                {plant.edible?.toString()}
                                            </td>
                                            <td className={`px-4 py-3 ${hints[4] ? 'bg-emerald-100/70' : 'bg-rose-100/70'}`}>
                                                {plant.vegetable?.toString()}
                                            </td>

                                            <td className={`px-4 py-3 ${hints[5] ? 'bg-emerald-100/70' : 'bg-rose-100/70'}`}>
                                                {plant.observations}
                                            </td>
                                            <td className={`px-4 py-3 ${hints[6]?.isCorrect ? 'bg-emerald-100/70 font-bold text-emerald-900' : 'bg-rose-100/70'}`}>
                                                <div className="flex items-center gap-2">
                                                    {plant.year}
                                                    {hints[6]?.isCorrect ? (
                                                        <span className="text-emerald-700 font-bold text-lg">&mdash;</span>
                                                    ) : hints[6]?.isHigher ? (
                                                        <span className="text-emerald-700 font-bold text-lg">&uarr;</span>
                                                    ) : (
                                                        <span className="text-emerald-700 font-bold text-lg">&darr;</span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DailyGame