import UserCollections from "../models/userCollectionModel.js";
import GameRounds from "../models/gameRoundModel.js";

export const getGlobalLeaderboard = async (req, res) => {
    try {
        const globalLeaderboard = await UserCollections.find().sort({ timeSeconds: -1 }).limit(10)
        .populate({path: "user", select: 'username email' });

        // Filter out entries where user was deleted (user will be null)
        const validLeaderboard = globalLeaderboard.filter(entry => entry.user !== null);

        res.status(200).json({message: "Global leaderboard statistics was retrieved successfully.", data: validLeaderboard});
    } catch (error) {
        res.status(500).json({errorMessage: "There was a problem in retrieving the global leaderboard statistics."});
    }
}

export const getLocalLeaderboard = async (req, res) => {
    try {
        const activeRound = await GameRounds.findOne({ isCurrent: true });

        // WRONG LOGIC, ITS TECHNICALLY FOR GLOBAL
        const localLeaderboard = await UserCollections.find({ gameRound: activeRound._id }).sort({ timeSeconds: -1 }).limit(10)
        .populate({path: "user", select: 'username email' });

        // Filter out entries where user was deleted (user will be null)
        const validLeaderboard = localLeaderboard.filter(entry => entry.user !== null);

        res.status(200).json({message: "Local leaderboard statistics was retrieved successfully.", data: validLeaderboard});
    } catch (error) {
        res.status(500).json({errorMessage: "There was a problem in retrieving the local leaderboard statistics."});
    }
}
