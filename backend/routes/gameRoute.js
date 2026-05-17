import express from 'express';
import { getAllGameRounds, getActiveGameRound, getGameRoundRange, checkGuess } from '../controllers/gameController.js';

const gameRoundRoute = express.Router();

gameRoundRoute.get("/rounds", getAllGameRounds);
gameRoundRoute.get("/activegame", getActiveGameRound);
gameRoundRoute.get("/7rounds", getGameRoundRange);
gameRoundRoute.post("/guess", checkGuess);

export default gameRoundRoute;