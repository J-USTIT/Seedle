function Filter({ 
    setFilter = (e) => {
        console.log("No Filter Function Set: ", e);
    },
    children 
}) {
    return (
        <>
            <select onChange={ (e) => setFilter(e.target.value) }>
                { children }    
            </select>
        </>
    )
}

export default Filter
