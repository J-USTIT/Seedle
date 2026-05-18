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

        const form = e.target;

        console.log(round._id);
        console.log(plant);
        try {
            const response = await axiosInstance.post("/updateGameRound", {
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


    // const endpoint = query ? `/plants/search?q=${query}&f=${filter}&s=${sorting}` : `/plants`;
    // const [data] = useFetch(endpoint);

    return (
        <>
            <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
                        <form onSubmit={onSubmit}>
                            <DialogTitle className="font-bold">Edit Round</DialogTitle>
                            <Description>Select the plant you want for the round:</Description>
                            <div>
                                <p>Play Date: {round?.playDate}</p>
                                <p>Original Plant: {round?.plantCommonName}</p>
                            </div>
                                <input type="text" name="query" id="query" value={query} onChange={e => setQuery(e.target.value)} />
                                <select id="plantSelector" name="plantSelector" value={plant} onChange={e => setPlant(e.target.value)}>
                                    <option value={round?.plant?.trefleId}>{round?.plantCommonName}</option>
                                    { plantsData?.data?.filter(plantdata => plantdata.id != round?.plant?.trefleId)?.map(plant => <option key={plant.id} value={plant.id}>{plant.common_name}</option>)}
                                </select>
                            <div className="flex gap-4">
                                <button onClick={() => setIsEditOpen(false)}>Cancel</button>
                                <button type="">Edit</button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

export default EditPlantHistoryModal
