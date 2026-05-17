
export const generateHints = (plantToday, plantGuess) => {
    
    // EXACT MATCHES

    const hint = [];
    const exactMatch = [
        "common_name",
        "family",
        "genus",
        "edible",
        "vegetable",
        "observations",
        "year"
    ];

    console.log("Common Name of Today's Plant:", plantToday.trefleData.common_name)

    exactMatch.forEach((field)=>{
        if(field === "year")
            if(plantToday.trefleData[field] == plantGuess.data[field]){
                console.log(plantToday.trefleData[field], plantGuess.data[field], plantToday.trefleData[field] == plantGuess.data[field]);
                hint.push({isCorrect: true, isHigher: null});
            }
            else if(plantToday.trefleData[field] > plantGuess.data[field]){
                console.log(plantToday.trefleData[field], plantGuess.data[field], plantToday.trefleData[field] == plantGuess.data[field]);
                hint.push({isCorrect: false, isHigher: true})
            }
            else{
                console.log(plantToday.trefleData[field], plantGuess.data[field], plantToday.trefleData[field] == plantGuess.data[field]);
                hint.push({isCorrect: false, isHigher: false})
            } 
        else{
            console.log(plantToday.trefleData[field], plantGuess.data[field], plantToday.trefleData[field] == plantGuess.data[field]);
            hint.push(plantToday.trefleData[field] == plantGuess.data[field]);
        }
    });

    console.log(hint);
    return hint;
}