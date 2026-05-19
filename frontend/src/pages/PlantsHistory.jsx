import { useState } from "react";
import useFetch from "../hooks/useFetch.js";
import EditPlantHistoryModal from "../components/PlantHistoryModals/EditPlantHistoryModal.jsx";

function PlantsHistory() {
    const [showPast, setShowPast] = useState(true);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [round, setRound] = useState(null);

    const [allRounds, refetchAllRounds] = useFetch("/rounds");
    const [sevenRounds, refetchSevenRounds] = useFetch("/7rounds");

    const editPlantHistoryModal = (round) => {
        setIsEditOpen((prev) => !prev);
        setRound((prev) => round);
    }

    const toggleShow = () => {
        setShowPast((prev) => !prev)
    }   

    const onSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const query = form.query.value;
    }

    return (
        <div className="flex flex-col items-center p-4 sm:p-6">
            <div className="w-full max-w-[1000px] bg-[#FCF9F2]/90 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_40px_-15px_rgba(46,125,50,0.1)] border border-white/50 p-6 sm:p-10 relative overflow-hidden mt-8">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-200/30 rounded-full blur-3xl animate-float pointer-events-none"></div>
                
                <div className="relative z-10">
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-semibold text-emerald-900 tracking-tight">Plants History</h1>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-6">
                        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row w-full lg:w-auto gap-2">
                            <input 
                                type="text" 
                                name="query" 
                                id="query" 
                                placeholder="Search by plant name..."
                                className="w-full md:w-64 px-4 py-2.5 rounded-xl border border-emerald-100 bg-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-emerald-800"
                            />
                            <button type="submit" className="px-5 py-2.5 rounded-xl bg-white text-emerald-800 font-bold border border-emerald-100 hover:bg-emerald-50 transition-colors">
                                Submit
                            </button>
                        </form>

                        <button 
                            onClick={toggleShow}
                            className="w-full md:w-auto px-6 py-2.5 rounded-xl bg-[#DAFAF1] text-[#003E33] font-bold shadow-sm hover:bg-[#159E5E] hover:text-white transition-all duration-200"
                        >
                            {showPast ? "Hide Past Rounds" : "Show All Rounds"}
                        </button>
                    </div>

                    <div className="w-full overflow-x-auto rounded-2xl border border-emerald-50/50 shadow-sm bg-white/40 backdrop-blur-sm">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr className="bg-white/60 text-emerald-800 text-xs uppercase tracking-wider font-semibold border-b border-emerald-100/50">
                                    <th className="px-6 py-4">Play Date</th>
                                    <th className="px-6 py-4">Plant Name</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-emerald-800 text-sm">
                                {
                                    allRounds && showPast === true ? allRounds?.map((round)=>
                                        <tr key={round._id} className="border-b border-emerald-50/30 hover:bg-white/30 transition-colors">
                                            <td className="px-6 py-4 font-medium text-emerald-700">{new Date(round.playDate).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 font-bold text-emerald-900">{round.plantCommonName}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => editPlantHistoryModal(round)} className="px-4 py-1.5 rounded-full bg-white text-emerald-700 text-xs font-bold border border-emerald-100 hover:bg-emerald-50 transition-colors">Edit</button>
                                            </td>
                                        </tr>
                                    ): showPast === true ?? <tr><td colSpan={3} className="text-center py-12 text-emerald-600/50">Loading...</td></tr>
                                }
                                {
                                    sevenRounds && showPast === false ? sevenRounds?.map((round)=>
                                        <tr key={round._id} className="border-b border-emerald-50/30 hover:bg-white/30 transition-colors">
                                            <td className="px-6 py-4 font-medium text-emerald-700">{round.playDate}</td>
                                            <td className="px-6 py-4 font-bold text-emerald-900">{round.plantCommonName}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => editPlantHistoryModal(round)} className="px-4 py-1.5 rounded-full bg-white text-emerald-700 text-xs font-bold border border-emerald-100 hover:bg-emerald-50 transition-colors">Edit</button>
                                            </td>
                                        </tr>
                                    ): showPast === false ?? <tr><td colSpan={3} className="text-center py-12 text-emerald-600/50">Loading...</td></tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            { isEditOpen && <EditPlantHistoryModal isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen} round={round} refetchAllRounds={refetchAllRounds} refetchSevenRounds={refetchSevenRounds} />}
        </div>
    )
}

export default PlantsHistory