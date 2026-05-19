import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import axiosInstance from '../../utils/axiosInstance';

function EditPlantHistoryModal({isEditOpen, setIsEditOpen, round, refetchAllRounds, refetchSevenRounds}) {
    const [query, setQuery] = useState("");
    const [plant, setPlant] = useState("");

    const endpoint = query ? `/plants/search?q=${query}&f=&s=asc` : `/plants`;
    const [plantsData, plantsDataRefetch] = useFetch(endpoint);
    
    useEffect(()=> plantsDataRefetch(), [query]);
    useEffect(()=> {
        setQuery(round.plantCommonName);
        setPlant(round.plant.trefleId);
    }, [isEditOpen]);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post("/updateGameRound", {
                roundId: round._id,
                plantId: plant,
            });
            refetchAllRounds();
            refetchSevenRounds();
            setIsEditOpen(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)} className="relative z-50">
            <div className="fixed inset-0 bg-emerald-900/20 backdrop-blur-sm flex w-screen items-center justify-center p-4">
                <DialogPanel className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-emerald-50 p-6 sm:p-10 space-y-4">
                    <form onSubmit={onSubmit} className="flex flex-col gap-5">
                        <div>
                            <DialogTitle className="text-2xl font-bold text-emerald-900 mb-2">Edit Round</DialogTitle>
                            <Description className="text-emerald-700/80 text-sm">Select the plant you want for the round:</Description>
                        </div>
                        
                        <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                            <p className="text-sm text-emerald-800 font-medium">Play Date: {round?.playDate}</p>
                            <p className="text-sm text-emerald-800 font-medium mt-1">Original Plant: {round?.plantCommonName}</p>
                        </div>

                        <div>
                            <label htmlFor="query" className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 block">Search Plant</label>
                            <input type="text" name="query" id="query" value={query} onChange={e => setQuery(e.target.value)} className="w-full px-5 py-3 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-emerald-800" />
                        </div>

                        <div>
                            <label htmlFor="plantSelector" className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 block">Select Plant</label>
                            <select id="plantSelector" name="plantSelector" value={plant} onChange={e => setPlant(e.target.value)} className="w-full px-5 py-3 rounded-xl border border-emerald-100 bg-emerald-50/30 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-emerald-800 cursor-pointer">
                                <option value={round?.plant?.trefleId}>{round?.plantCommonName}</option>
                                { plantsData?.data?.filter(plantdata => plantdata.id != round?.plant?.trefleId)?.map(plant => <option key={plant.id} value={plant.id}>{plant.common_name}</option>)}
                            </select>
                        </div>

                        <div className="flex justify-end gap-3 mt-4">
                            <button type="button" onClick={() => setIsEditOpen(false)} className="px-6 py-2.5 rounded-xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-colors">Cancel</button>
                            <button type="submit" className="px-6 py-2.5 rounded-xl bg-[#DAFAF1] text-[#003E33] font-bold hover:bg-[#159E5E] hover:text-white transition-colors">Edit</button>
                        </div>
                    </form>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default EditPlantHistoryModal