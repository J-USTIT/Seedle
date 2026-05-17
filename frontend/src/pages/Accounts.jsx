import useFetch from "../hooks/useFetch"

function Accounts() {

    const [data] = useFetch("http://localhost:8000/api/users");
    
    return (
        <div>
            <h1>Accounts</h1>
            {/* COULD USE DATATABLES OR SIMILAR */}
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    { data?.userData?.map((user)=>
                        <tr key={user.id}><td>{user.username}</td><td>{user.email}</td><td>{user.role}</td></tr>
                    ) }
                </tbody>
            </table>
        </div>
    )
}

export default Accounts
