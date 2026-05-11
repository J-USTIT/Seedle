import LeaderboardEntry from "../components/LeaderboardEntry";
import LinkButton from "../components/LinkButton";
import useFetch from "../hooks/useFetch"

function Leaderboards() {

    // CHANGE THIS TO RETRIEVING USERCOLLECTION DATA INSTEAD
    const [data] = useFetch("http://localhost:8001/api/users");

    return (
        <div>
            <h1>Leaderboards</h1>
            <LinkButton to="/"> Home </LinkButton>
            { data?.userData.map((user) => 
                <LeaderboardEntry key={user.id} name={user.name} email={user.email} />
            ) } 
        </div>
    )
}

export default Leaderboards
