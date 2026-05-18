import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch.js";
import axiosInstance from "../utils/axiosInstance.js";
import { startSession, loadSession, saveGuess, getElapsedSeconds, saveResult, isSessionFromToday, clearSession } from "../utils/guessStorage.js";
import { useAuth } from "../context/AuthContext.jsx";

function DailyGame() {
    
    const { user } = useAuth();
    const [query, setQuery] = useState("");
    const [guesses, setGuesses] = useState([]);
    const [result, setResult] = useState(null);
    const [roundId, setRoundId] = useState(null);
    
    const endpoint = query ? `/plants/search?q=${query}&s=asc` : `/plants`;
    const [plantList] = useFetch(endpoint);

    useEffect(()=>{
        const initSession = async () => {
            const { data } = await axiosInstance.get('/activegame');
            const { _id: id } = await data;

            setRoundId(id);

            if (!isSessionFromToday(id)) {
                clearSession(id); 
            }

            const existingSession = loadSession(id);
            if (existingSession && existingSession.userId !== user?.userId) {
                clearSession(id);
            }
            
            startSession(id, user?.userId);
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
        
        const guess = parseInt(e.target.guess.value); 

        try {
            const { data: response } = await axiosInstance.post('/guess', {
                guess,
                guessesUsed: guesses.length + 1,
                timeSeconds: getElapsedSeconds(roundId),
            });

            const { data: plantGuess } = await axiosInstance.get(`/plant/${guess}`);
            
            const newGuess = { id: guesses.length, value: plantGuess.data, correct: response.correct , hints: response.hints }
            
            saveGuess(roundId, newGuess);
            setGuesses(prev => [...prev, newGuess]);
            
            saveResult(roundId, response);
            setResult(response);
        } catch (error) {
            console.log(error);
        }
    }

    if(result?.correct){
        // alert("CONGRATS YOU WON!!! DO REPLACE THIS WITH A PROPER DIALOG :)");
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[85vh] bg-gradient-to-br from-[#f4f9f4] to-[#e2f0e6] p-4 sm:p-6 font-sans">
            
            <div className="w-full max-w-[1200px] bg-[#FCF9F2]/90 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(46,125,50,0.1)] border border-white/50 p-6 sm:p-10 relative overflow-hidden mt-8">
                
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-200/30 rounded-full blur-3xl animate-float pointer-events-none"></div>
                <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-green-200/30 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>

                <div className="relative z-10">
                    <div className="mb-10 text-center">
                        <h1 className="text-4xl md:text-5xl font-semibold text-emerald-900 tracking-tight mb-2">
                            Daily Game
                        </h1>
                        <p className="text-emerald-700/70 text-sm font-medium">Guess the plant of the day</p>
                    </div>

                    <form id="guessForm" onSubmit={onSubmit} className="flex flex-col md:flex-row gap-4 mb-10 max-w-4xl mx-auto justify-center">
                        <input 
                            type="text" 
                            value={query} 
                            placeholder="Search plants..."
                            onChange={(e)=> setQuery(e.target.value)} 
                            disabled={ result?.correct }
                            className="flex-1 px-5 py-3 rounded-2xl border border-emerald-100 bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-emerald-800 placeholder-emerald-300 disabled:opacity-60"
                        />
                        
                        <select 
                            id="guess" 
                            name="guess" 
                            disabled={!plantList || result?.correct}
                            className="flex-1 px-5 py-3 rounded-2xl border border-emerald-100 bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-emerald-800 disabled:opacity-60 cursor-pointer"
                        >
                            { plantList ? plantList?.data?.filter((plant) => !guesses.some((guess) => guess.value.id === plant.id))?.map((plant) => 
                                <option key={plant.id} value={plant.id}>{plant.common_name}</option>
                            ) : <option>Loading...</option>} 
                        </select>
                        
                        <button 
                            type="submit" 
                            disabled={result?.correct}
                            className="px-8 py-3 rounded-full bg-[#DAFAF1] text-[#003E33] font-bold shadow-sm hover:bg-[#159E5E] hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                        >
                            Submit Guess
                        </button>
                    </form>

                    <div className="overflow-x-auto rounded-2xl border border-emerald-50/50 shadow-sm bg-white/40 backdrop-blur-sm">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="bg-white/60 text-emerald-800 text-xs sm:text-sm uppercase tracking-wider font-semibold border-b border-emerald-100/50">
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
                            <tbody className="text-emerald-800 text-sm md:text-base">
                                {
                                    guesses.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} className="text-center py-12 text-emerald-600/50 font-medium italic">
                                                Enter a guess to begin.
                                            </td>
                                        </tr>
                                    ) : guesses.map(({value: plant, hints}, index)=>
                                        <tr key={index} className="border-b border-emerald-50/30 hover:bg-white/30 transition-colors">
                                            <td className="px-4 py-3 bg-white/20">
                                                <img src={plant.image_url} alt={plant.common_name} className="w-20 h-20 object-cover rounded-xl shadow-sm" />
                                            </td>
                                            
                                            <td className={`px-4 py-3 ${hints[0] ? 'bg-emerald-100/70' : ''}`}>
                                                {plant.common_name}
                                            </td>
                                            <td className={`px-4 py-3 ${hints[1] ? 'bg-emerald-100/70' : ''}`}>
                                                {plant.family}
                                            </td>
                                            <td className={`px-4 py-3 ${hints[2] ? 'bg-emerald-100/70' : ''}`}>
                                                {plant.genus}
                                            </td>

                                            <td className={`px-4 py-3 ${hints[3] ? 'bg-emerald-100/70' : 'bg-rose-100/70'}`}>
                                                {plant.edible?.toString()}
                                            </td>
                                            <td className={`px-4 py-3 ${hints[4] ? 'bg-emerald-100/70' : 'bg-rose-100/70'}`}>
                                                {plant.vegetable?.toString()}
                                            </td>

                                            <td className={`px-4 py-3 ${hints[5] ? 'bg-emerald-100/70' : ''}`}>
                                                {plant.observations}
                                            </td>
                                            <td className={`px-4 py-3 ${hints[6]?.isCorrect ? 'bg-emerald-100/70 font-semibold' : ''}`}>
                                                <div className="flex items-center gap-2">
                                                    {plant.year}
                                                    {hints[6]?.isCorrect ? (
                                                        <span className="text-[#159E5E] font-bold text-lg">&mdash;</span>
                                                    ) : hints[6]?.isHigher ? (
                                                        <span className="text-emerald-400 font-bold text-lg">&uarr;</span>
                                                    ) : (
                                                        <span className="text-emerald-400 font-bold text-lg">&darr;</span>
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
            {/* WIN COMPONENT */}
        </div>
    )
}

export default DailyGame