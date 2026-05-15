import { useState } from "react";
import useFetch from "../hooks/useFetch.js";

function PlantsHistory() {
    // CREATE AND USE GAMEROUND
    const [showPast, setShowPast] = useState(true);

    const [allRounds] = useFetch("http://localhost:8001/api/rounds");
    const [sevenRounds] = useFetch("http://localhost:8001/api/7rounds");

    const onSubmit = (e) => {
        e.preventDefault();

        const form = e.target;

        const query = form.query.value;
    }

    const toggleShow = () => {
        setShowPast((prev) => !prev)
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
                                <td>{round.playDate}</td>
                                <td>{round.plantCommonName}</td>
                                <td><button>Edit</button></td>
                            </tr>
                        ): showPast === true ?? <tr><td colSpan={3}>Loading...</td></tr>
                    }
                    {
                        sevenRounds && showPast === false ? sevenRounds?.map((round)=>
                            <tr key={round._id}>
                                <td>{round.playDate}</td>
                                <td>{round.plantCommonName}</td>
                                <td><button>Edit</button></td>
                            </tr>
                        ): showPast === false ?? <tr><td colSpan={3}>Loading...</td></tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default PlantsHistory
