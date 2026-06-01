import { Link } from "react-router-dom"

function LinkButton({ to, className = "", style, children }) {
    return (
        <Link
            to={to}
            className={`inline-block px-5 py-2.5 rounded-full bg-emerald-50 text-emerald-700 font-bold uppercase tracking-wider border-2 border-emerald-600 shadow-[0_4px_0_theme(colors.emerald.600)] hover:bg-emerald-600 hover:text-white hover:shadow-[0_2px_0_theme(colors.emerald.800)] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] transition-all duration-150 ${className}`}
            style={style}
        >
            {children}
        </Link>
    )
}

export default LinkButton
