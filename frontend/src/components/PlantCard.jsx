import LinkButton from './LinkButton.jsx'
// FUNCTION IS TO ACT AS A CARD FOR PLANTS IN DICTIONARY AND COLLECTION
function PlantCard({id, title, description}) {
    return (
        <div className="flex flex-col justify-between bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-emerald-50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div>
                <h2 className="text-xl font-bold text-emerald-900 mb-2 leading-tight">
                    {title}    
                </h2>
                <p className="text-emerald-700/80 mb-6 text-sm line-clamp-3">
                    {description}
                </p>
            </div>
            <LinkButton to={`/plant/${id}`} className="block text-center w-full px-4 py-2.5 rounded-xl bg-[#DAFAF1] text-[#003E33] font-semibold hover:bg-[#159E5E] hover:text-white transition-colors duration-200">
                More Details
            </LinkButton>
        </div>
    )
}

export default PlantCard
