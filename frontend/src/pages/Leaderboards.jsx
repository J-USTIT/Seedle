import LeaderboardEntry from "../components/LeaderboardEntry";
import useFetch from "../hooks/useFetch"

function Leaderboards() {

    const [data] = useFetch("http://localhost:8001/api/users");

    console.log(data?.userData[1].name)

    return (
        <div>
            <h1>Leaderboards</h1>

            { data?.userData.map((user) => 
                <LeaderboardEntry key={user.id} name={user.name} email={user.email} />
            ) } 
        </div>
    )
}

export default Leaderboards
