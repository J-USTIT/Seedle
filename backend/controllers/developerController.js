import Developers from '../models/developerModel.js';

export const getAllDevelopers = async (req, res) => {
    try {
        const developers = await Developers.find({}).sort({ createdAt: 1 });
        
        res.status(200).json({
            message: "Developers retrieved successfully.",
            data: developers
        });
    } catch (error) {
        console.error("Error fetching developers:", error);
        res.status(500).json({
            errorMessage: "Failed to fetch developers."
        });
    }
};
