import express from 'express';
import { getGlobalLeaderboard, getLocalLeaderboard } from '../controllers/leaderboardController.js';

const leaderboardRoute = express.Router();

leaderboardRoute.get("/globalleaderboard", getGlobalLeaderboard);
leaderboardRoute.get("/localleaderboard", getLocalLeaderboard);

export default leaderboardRoute;