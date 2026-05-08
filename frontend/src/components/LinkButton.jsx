import { Link } from "react-router"

import "../styles/linkButton.css"

function LinkButton({to, className, style, children}) {
    return (
        <button className={className} style={style} >
            <Link to={to}>
                { children }
            </Link>
        </button>
    )
}

export default LinkButton
