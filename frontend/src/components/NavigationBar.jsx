import LinkButton from "./LinkButton"

function NavigationBar({children}) {
    return (
        <>
            {/* SET THE NAVIGATION STLYES */}
            <nav>
                {children}
            </nav>
        </>
    )
}

export default NavigationBar
