function Search({setQuery}) {
    return (
        <>
            <input 
                type="text"
                onKeyUp={(e)=>{
                    if(e.key === 'Enter') setQuery(e.target.value);
                }}
            />
        </>
    )
}

export default Search
