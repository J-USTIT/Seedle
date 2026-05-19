import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { getAllGameRounds, getActiveGameStatus, getGameRoundRange, checkGuess } from '../controllers/gameController.js';

const gameRoundRoute = express.Router();

gameRoundRoute.get("/rounds", getAllGameRounds);
gameRoundRoute.get("/activegame/status", authenticateToken, getActiveGameStatus);
gameRoundRoute.get("/7rounds", getGameRoundRange);
gameRoundRoute.post("/guess", authenticateToken, checkGuess);

export default gameRoundRoute;