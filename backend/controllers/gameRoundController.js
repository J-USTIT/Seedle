import GameRounds from '../models/gameRoundModel.js';
import PlantCaches from '../models/plantCacheModel.js';
import { getOrCreatePlantCache } from './plantCacheController.js';
import { getRandomTrefleId, getPlantByIDService } from '../services/trefleServices.js';

// AUTOMATIC POPULATION OF GAME ROUNDS
export const autoPopulateGameRounds = async () => {
    try {
        const results = [];

        for(let i = 0; i < 7; i++){
            const date = new Date();
            date.setHours(0, 0, 0, 0);
            date.setDate(date.getDate() + i);

            const exists = await GameRounds.findOne({ playDate: date });
            if(exists) {
                results.push({ date, status: 'Round already exists.'});
                continue;
            };

            const randomTrefleId = await getRandomTrefleId();
            
            const plantCache = await getOrCreatePlantCache(randomTrefleId);
            
            const round = await GameRounds.create({
                plant: plantCache.id,
                plantCommonName: plantCache.commonName,
                playDate: date,
                hints: [],
                isCurrent: i == 0
            });
            
            results.push({ date, status: 'Created new round', round });
        }

        console.log("Game rounds populated:", results);
        return results;

    } catch (error) {
        console.error("Error populating game rounds:", error.message);
    }
}

// GETS ALL GAMEROUNDS
export const getAllGameRounds = async (req, res) => {
    try {
        const rounds = await GameRounds.find({});

        res.json(rounds);
    } catch (error) {
        res.status(500).json({errorMessage: "Failed to fetch all game rounds."});
    }
}

export const getGameRoundRange = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const next7Days = new Date();
        next7Days.setDate(today.getDate() + 7);
        next7Days.setHours(23, 59, 59, 999);

        const results = await GameRounds.find({
            playDate: {
                $gte: today,
                $lte: next7Days
            }
        });
        
        res.status(200).json(results);
    } catch (error) {
        
        res.status(500).json({errorMessage: "Failed to fetch gamerounds ."});
    }
}


// GETS ACTIVE GAMEROUND
export const getActiveGameRound = async (req, res) => {
    try {
        // FIND GAME ROUND
        const activeGameRound = await GameRounds.findOne({ isCurrent: true });

        // RETRIEVE PLANT CACHE
        const activePlant = await PlantCaches.findById(activeGameRound.plant);

        res.status(200).json(activePlant);
    } catch (error) {
        res.status(500).json({errorMessage: "Failed to fetch active game round."});
    }
}

// WHEN IT MATCHES
export const checkGuess = async (req, res) => {
    try {
        // RETRIEVE GUESS AND QUERY
        const guess = req.body.guess; // guess is in ID

        const guessedPlant = await getPlantByIDService(guess);
        
        // CHECK IF ISCURRENT GAMEROUND MATCHES
        const gameToday = await GameRounds.findOne({ isCurrent: true });

        const plantToday = await PlantCaches.findById(gameToday.plant);

        // IF MATCH THEN RETURN SUCCESS

        console.log(plantToday);
        console.log(guessedPlant.data.id);

        if(plantToday.trefleId === guessedPlant.data.id){
            res.status(200).json({correct: true});
        }
        else{
            res.status(200).json({correct: false});
            console.log("NOT SAME");
        }
        // RETURN EACH HINT (RED, GREEN, OR YELLOW)

    } catch (error) {
        res.status(500).json({errorMessage: "Failed to match guess."});
    }
}

