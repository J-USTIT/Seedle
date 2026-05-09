import express from "express";
import { getPlantByID, getAllPlants, getSearchPlants } from "../controllers/plantController.js"; 

const trefleRoute = express.Router();

trefleRoute.get("/plant/:id", getPlantByID);
trefleRoute.get("/plants", getAllPlants);
trefleRoute.get("/plants/search", getSearchPlants);

export default trefleRoute;