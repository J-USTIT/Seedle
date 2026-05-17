import GameRounds from '../models/gameRoundModel.js';
import PlantCaches from '../models/plantCacheModel.js';
import Users from '../models/userModel.js';
import UserCollections from '../models/userCollectionModel.js';
import { getOrCreatePlantCache } from './plantCacheController.js';
import { getRandomTrefleId, getPlantByIDService } from '../services/trefleServices.js';
import { generateHints } from '../services/gameServices.js';

// AUTOMATIC POPULATION OF GAME ROUNDS
export const autoPopulateGameRounds = async () => {
    try {
        const results = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for(let i = 0; i < 7; i++){
            const date = new Date();
            date.setHours(0, 0, 0, 0);
            date.setDate(date.getDate() + i);

            const currentRound = await GameRounds.findOne({
                isCurrent: true
            });

            if (currentRound && currentRound?.playDate.getTime() !== today.getTime()) {
                console.log("CHANGED OLD");
                const updateOldCurrentRound = await GameRounds.findByIdAndUpdate(currentRound.id, {isCurrent: false}, { new: true });
            }

            const exists = await GameRounds.findOne({ playDate: date });
            if(exists) {
                if (exists.isCurrent == false && exists.playDate.getTime() == today.getTime()){
                    const updateNewCurrentRound = await GameRounds.findByIdAndUpdate(exists.id, {isCurrent: true}, {new: true});
                }
                
                results.push({ date, status: 'Round already exists.'});
                continue;
            };

            const randomTrefleId = await getRandomTrefleId();
            
            const plantCache = await getOrCreatePlantCache(randomTrefleId);
            console.log("IMPORTANT PLANT CACHE CHECK: ", plantCache.id);

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

export const getActiveGameRoundId = async (req, res) => {
    try {
        const activeGameRound = await GameRounds.findOne({ isCurrent: true });
        res.status(200).json({ id: activeGameRound._id });
    } catch (error) {
        res.status(500).json({errorMessage: "Failed to fetch active game round id."});
    }
}

// WHEN IT MATCHES
export const checkGuess = async (req, res) => {
    try {
        // RETRIEVE GUESS AND QUERY
        const { guess, guessesUsed, timeSeconds } = req.body; // guess is in ID

        const guessedPlant = await getPlantByIDService(guess);
        
        // CHECK IF ISCURRENT GAMEROUND MATCHES
        const gameToday = await GameRounds.findOne({ isCurrent: true });

        const plantToday = await PlantCaches.findById(gameToday.plant);

        // IF MATCH THEN RETURN SUCCESS

        // console.log(plantToday);
        // console.log(guessedPlant.data.id);

        const generatedHints = generateHints(plantToday, guessedPlant);
        if(plantToday.trefleId === guessedPlant.data.id){
            // RUN FUNCTION TO RETRIEVE LOGGED USER AND CREATE NEW USERCOLLECTION

            // TEMPORARY HARD CODED ID (REPLACE)
            const authUserId = await Users.findOne({email: "juliennelizzie.cho.cfad@ust.edu.ph"}); 

            const newUserCollection = {
                user: authUserId.id,
                plant: plantToday.id,
                gameRound: gameToday.id,
                guessesUsed,
                timeSeconds, 
                completed: true,
                answeredAt: new Date(),
            };
            
            const savedGame = await UserCollections.create(newUserCollection);
            
            console.log("SAVED USER COLLECTION");

            res.status(200).json({correct: true, hints: generatedHints});
        }
        else{
            res.status(200).json({correct: false, hints: generatedHints});
        }

    } catch (error) {
        res.status(500).json({errorMessage: "Failed to match guess."});
    }
}
