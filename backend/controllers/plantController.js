import { getPlantByIDService, getAllPlantsService, getSearchPlantsService } from "../services/trefleServices.js"

// /api/plant/:id
export const getPlantByID = async (req, res) => {
    try {
        const data = await getPlantByIDService(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({errorMessage: "Failed to fetch plant data."});
    }
}

// /api/plants
export const getAllPlants = async (req, res) => {
    try {
        const data = await getAllPlantsService();
        res.json(data);
    } catch (error) {
        res.status(500).json({errorMessage: "Failed to fetch plant data."});
    }
}

// /api/plants/search
export const getSearchPlants = async (req, res) => {
    try {
        const { q, f, s } = req.query;
        const data = await getSearchPlantsService(q, f, s);
        res.json(data);
    } catch (error) {
        res.status(500).json({errorMessage: "Failed to fetch plant data."});
    }
}