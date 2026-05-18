import { Link } from "react-router-dom"

function LinkButton({to, className = "", style, children}) {
    return (
        <Link 
            to={to} 
            className={`inline-block px-5 py-2.5 rounded-full bg-emerald-50 text-emerald-700 font-medium hover:bg-emerald-600 hover:text-white hover:shadow-[0_8px_20px_-6px_rgba(5,150,105,0.4)] active:scale-[0.98] transition-all duration-300 ${className}`}
            style={style}
        >
            { children }
        </Link>
    )
}

export default LinkButton
