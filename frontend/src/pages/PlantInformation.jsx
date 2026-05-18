import { useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import Loading from "../components/Loading";
import LinkButton from "../components/LinkButton";

function PlantData({ plant }) {
    const { common_name, scientific_name, image_url, family, genus, edible, vegetable, observations, year } = plant;

    return (
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start mt-4">
            {/* Left side: Image */}
            <div className="w-full md:w-5/12 lg:w-1/3">
                <img 
                    src={image_url} 
                    alt={common_name} 
                    className="w-full aspect-square object-cover rounded-3xl shadow-lg border-4 border-white"
                />
            </div>

            {/* Right side: Plant Details */}
            <div className="w-full md:w-7/12 lg:w-2/3 flex flex-col">
                <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-2">{common_name}</h1>
                <p className="text-xl text-emerald-600/80 italic mb-8 pb-6 border-b border-emerald-100/50">{scientific_name}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white/60 p-4 rounded-2xl border border-emerald-50 shadow-sm">
                        <p className="text-xs text-emerald-500 uppercase font-bold tracking-wider mb-1">Family</p>
                        <p className="text-emerald-900 font-semibold">{family || "Unknown"}</p>
                    </div>
                    <div className="bg-white/60 p-4 rounded-2xl border border-emerald-50 shadow-sm">
                        <p className="text-xs text-emerald-500 uppercase font-bold tracking-wider mb-1">Genus</p>
                        <p className="text-emerald-900 font-semibold">{genus || "Unknown"}</p>
                    </div>
                    <div className="bg-white/60 p-4 rounded-2xl border border-emerald-50 shadow-sm">
                        <p className="text-xs text-emerald-500 uppercase font-bold tracking-wider mb-1">Edible</p>
                        <p className="text-emerald-900 font-semibold">{edible ? "Yes" : "No"}</p>
                    </div>
                    <div className="bg-white/60 p-4 rounded-2xl border border-emerald-50 shadow-sm">
                        <p className="text-xs text-emerald-500 uppercase font-bold tracking-wider mb-1">Year</p>
                        <p className="text-emerald-900 font-semibold">{year || "N/A"}</p>
                    </div>
                </div>

                <div className="bg-white/60 p-6 rounded-2xl border border-emerald-50 shadow-sm">
                    <p className="text-xs text-emerald-500 uppercase font-bold tracking-wider mb-2">Observations</p>
                    <p className="text-emerald-800 leading-relaxed">
                        {observations || "No observations recorded for this plant."}
                    </p>
                </div>
            </div>
        </div>
    );
}

function PlantInformation() {
    const { id } = useParams();
    const [ plant ] = useFetch(`/plant/${id}`);
    
    const isLoading = plant?.data ? false : true;

    return (
        <div className="flex flex-col items-center justify-center min-h-[85vh] bg-gradient-to-br from-[#f4f9f4] to-[#e2f0e6] p-4 sm:p-6 font-sans">
            <div className="w-full max-w-[1000px] bg-[#FCF9F2]/90 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(46,125,50,0.1)] border border-white/50 p-6 sm:p-10 relative overflow-hidden mt-8">
                
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-200/30 rounded-full blur-3xl animate-float pointer-events-none"></div>
                
                <div className="relative z-10">
                    <div className="mb-6">
                        {/* Go back button handles returning to wherever they came from */}
                        <LinkButton to=".." className="text-emerald-600 hover:text-emerald-800 font-medium flex items-center gap-2 transition-colors">
                            &larr; Back
                        </LinkButton>
                    </div>

                    { isLoading ? (
                        <div className="flex justify-center py-20"><Loading /></div>
                    ) : (
                        <PlantData plant={plant.data} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default PlantInformation