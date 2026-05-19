import { useState } from "react";
import useFetch from "../hooks/useFetch.js";
import EditPlantHistoryModal from "../components/PlantHistoryModals/EditPlantHistoryModal.jsx";

function PlantsHistory() {
    // CREATE AND USE GAMEROUND
    const [showPast, setShowPast] = useState(true);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [round, setRound] = useState(null);

    const [allRounds, refetchAllRounds] = useFetch("/rounds");
    const [sevenRounds, refetchSevenRounds] = useFetch("/7rounds");

    const editPlantHistoryModal = (round) => {
        setIsEditOpen((prev) => !prev);
        setRound((prev) => round);
        console.log(isEditOpen);
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
        <div>
            <h1>Plants History</h1>

            <form onSubmit={onSubmit}>
                <input type="text" name="query" id="query" />
                <input type="submit" value="Submit" />
            </form>

            <button onClick={toggleShow}>
                {showPast ? "Hide Past Rounds" : "Show All Rounds"}
            </button>
            <table>
                <thead>
                    <tr>
                        <th>Play Date</th>
                        <th>Plant Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allRounds && showPast === true ? allRounds?.map((round)=>
                            <tr key={round._id}>
                                <td>{new Date(round.playDate).toLocaleDateString()}</td>
                                <td>{round.plantCommonName}</td>
                                <td><button onClick={() => editPlantHistoryModal(round)}>Edit</button></td>
                            </tr>
                        ): showPast === true ?? <tr><td colSpan={3}>Loading...</td></tr>
                    }
                    {
                        sevenRounds && showPast === false ? sevenRounds?.map((round)=>
                            <tr key={round._id}>
                                <td>{round.playDate}</td>
                                <td>{round.plantCommonName}</td>
                                <td><button onClick={() => editPlantHistoryModal(round)}>Edit</button></td>
                            </tr>
                        ): showPast === false ?? <tr><td colSpan={3}>Loading...</td></tr>
                    }
                </tbody>
            </table>
            
            { isEditOpen && <EditPlantHistoryModal isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen} round={round} refetchAllRounds={refetchAllRounds} refetchSevenRounds={refetchSevenRounds} />}
        </div>
    )
}

export default PlantsHistory
