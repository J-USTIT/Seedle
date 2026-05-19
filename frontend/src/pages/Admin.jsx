import { Outlet } from "react-router"
import LinkButton from "../components/LinkButton"

function Admin() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f4f9f4] to-[#e2f0e6] font-sans">
            <nav className="bg-white/80 backdrop-blur-md border-b border-emerald-100 p-4 sticky top-0 z-40 flex flex-wrap gap-2 sm:gap-4 justify-center shadow-sm">
                <LinkButton to="/home" className="px-4 sm:px-6 py-2.5 rounded-xl text-emerald-800 font-bold hover:bg-emerald-50 transition-colors">Home</LinkButton>
                <LinkButton to="/admin/accounts" className="px-4 sm:px-6 py-2.5 rounded-xl text-emerald-800 font-bold hover:bg-emerald-50 transition-colors">Accounts</LinkButton>
                <LinkButton to="/admin/plantshistory" className="px-4 sm:px-6 py-2.5 rounded-xl text-emerald-800 font-bold hover:bg-emerald-50 transition-colors">Plants History</LinkButton>
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Admin