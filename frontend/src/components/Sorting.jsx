function Sorting({ 
    setSorting = (e) => {
        console.log("No Sorting Function Set: ", e);
    },
    children 
}) {
    return (
        <>
            <select onChange={ (e) => setSorting(e.target.value) }>
                { children }    
            </select>
        </>
    )
}

export default Sorting
