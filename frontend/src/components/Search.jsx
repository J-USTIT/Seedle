function Search({setQuery}) {
    return (
        <form onSubmit={(e)=>{e.preventDefault();}}>
            <input 
                type="text"
                onKeyUp={(e)=>{
                    if(e.key === 'Enter') setQuery(e.target.value);
                }}
            />
        </form>
    )
}

export default Search
