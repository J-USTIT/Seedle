import LeaderboardEntry from "../components/LeaderboardEntry";
import LinkButton from "../components/LinkButton";
import useFetch from "../hooks/useFetch.js"

function Leaderboards() {

    // CHANGE THIS TO RETRIEVING USERCOLLECTION DATA INSTEAD
    const [localScoreData] = useFetch("http://localhost:8001/api/localleaderboard");

    console.log(localScoreData);
    return (
        <div>
            <h1>Leaderboards</h1>
            <LinkButton to="/"> Home </LinkButton>
            
            <table>
                <thead>
                    <tr>
                        <th>No. </th>
                        <th>Username</th>
                        <th>Time Spent</th>
                    </tr>
                </thead>
                <tbody>
                    { localScoreData?.data?.map((score, index) => 
                        <tr>
                            <td>{index + 1}</td>
                            <td>{score.user.username}</td>
                            <td>{score.timeSeconds}</td>
                            {/* ADD FUNCTION FOR TRANSLATING SECONDS TO MINUTES TO HOURS TO DAYS TO MONTHS TO YEARS */}
                        </tr>
                    ) }
                </tbody>
            </table>
        </div>
    )
}

export default Leaderboards
