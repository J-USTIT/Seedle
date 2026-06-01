import { useState } from "react"
import PlantCard from "../components/PlantCard.jsx"
import LinkButton from "../components/LinkButton.jsx";
import useFetch from "../hooks/useFetch.js";
import Loading from "../components/Loading.jsx";
import Search from "../components/Search.jsx";
import Filter from "../components/Filter.jsx";
import Sorting from "../components/Sorting.jsx";

function Dictionary() {
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("");
    const [sorting, setSorting] = useState("asc");

    const endpoint = query ? `/plants/search?q=${query}&f=${filter}&s=${sorting}` : `/plants`;
    const [data] = useFetch(endpoint);

    return (
        <div className="flex flex-col items-center justify-center min-h-[85vh] bg-gradient-to-br from-[#f4f9f4] to-[#e2f0e6] bg-game-grid p-4 sm:p-6 font-sans relative">
            <div className="w-full max-w-[1200px] bg-[#F3F0E6]/95 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(46,125,50,0.15)] border-4 border-b-[8px] border-white/80 p-6 sm:p-10 relative overflow-hidden mt-8 text-emerald-900 animate-fade-in-up">
                
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-200/30 rounded-full blur-3xl animate-float pointer-events-none"></div>
                <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-green-200/30 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>

                <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-900 tracking-tight mb-2 text-game-shadow">Dictionary 📖</h1>
                            <p className="text-emerald-800/80 text-sm font-medium">Explore the complete botanical database 🌿</p>
                        </div>
                        <LinkButton to="/home" className="px-8 py-3 rounded-full bg-white text-[#003E33] font-bold shadow-sm hover:bg-emerald-50 transition-all duration-200 border border-emerald-100 flex items-center gap-2">
                            🏠 Back to Home
                        </LinkButton>
                    </div>

                    <form 
                        onSubmit={ (e) => { e.preventDefault() }}
                        className="flex flex-col md:flex-row gap-4 mb-10 bg-white/50 p-4 rounded-2xl border border-emerald-100 shadow-sm [&_input]:flex-1 [&_input]:px-5 [&_input]:py-3 [&_input]:rounded-xl [&_input]:border [&_input]:border-emerald-200 [&_input]:bg-white/90 [&_input]:text-emerald-900 [&_input]:placeholder-emerald-400 [&_input]:focus:outline-none [&_input]:focus:ring-2 [&_input]:focus:ring-emerald-400 [&_select]:flex-1 [&_select]:px-5 [&_select]:py-3 [&_select]:rounded-xl [&_select]:border [&_select]:border-emerald-200 [&_select]:bg-white/90 [&_select]:text-emerald-900 [&_select]:focus:outline-none [&_select]:focus:ring-2 [&_select]:focus:ring-emerald-400 [&_select]:cursor-pointer"
                    >
                        <Search setQuery={setQuery} />
                        <Filter setFilter={setFilter} >
                            <option value="">All Families</option>
                        </Filter>
                        <Sorting setSorting={setSorting} >
                            <option value="asc">A-Z</option>
                            <option value="desc">Z-A</option>
                        </Sorting>
                    </form>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        { data !== null ? data.data?.map((plant) => 
                            <PlantCard key={plant.id} id={plant.id} title={plant.scientific_name} description={plant.common_name} />
                        ) : (
                            <div className="col-span-full flex justify-center py-12"><Loading /></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dictionary