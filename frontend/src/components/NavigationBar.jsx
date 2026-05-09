import LinkButton from "./LinkButton"

function NavigationBar({children}) {
    return (
        <>
            <nav>
                {children}
            </nav>
        </>
    )
}

export default NavigationBar
