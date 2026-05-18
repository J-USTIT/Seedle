import express from 'express';
import { getAllGameRounds, getActiveGameRound, getGameRoundRange, checkGuess, updateGameRound } from '../controllers/gameController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const gameRoundRoute = express.Router();

gameRoundRoute.get("/rounds", getAllGameRounds);
gameRoundRoute.get("/activegame", getActiveGameRound);
gameRoundRoute.get("/7rounds", getGameRoundRange);
gameRoundRoute.post("/guess", authenticateToken, checkGuess);
gameRoundRoute.post("/updateGameRound", authenticateToken, updateGameRound);

export default gameRoundRoute;