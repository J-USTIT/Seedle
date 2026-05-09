import { Outlet } from "react-router"
import LinkButton from "../components/LinkButton"

function Admin() {
    return (
        <>
            {/* You can the nav, this is just temporary */}
            <nav>
                <LinkButton to="/home">Home</LinkButton>
                <LinkButton to="/admin/accounts">Accounts</LinkButton>
                <LinkButton to="/admin/plantshistory">Plants History</LinkButton>
            </nav>
            <Outlet />
        </>
    )
}

export default Admin
