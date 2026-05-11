import axios from "axios";
import PlantCaches from "../models/plantCacheModel.js";
import { getPlantByIDService } from "../services/trefleServices.js"

export const getOrCreatePlantCache = async (trefleId) => {
    // CHECK IF CACHE EXISTS
    console.log("This is the plant id I got: ", trefleId);
    const id = parseInt(trefleId);
    
    const existing = await PlantCaches.findOne({ trefleId: id });
    if (existing) return existing;

    console.log("Plant not in cache");

    const { data } = await getPlantByIDService(trefleId);

    console.log(data.family);
    const createdPlant = await PlantCaches.create({
        trefleId: data.id,
        slug: data.slug,
        commonName: data.common_name,
        scientificName: data.scientific_name,
        family: data.family,
        imageUrl: data.image_url,
        trefleData: data,
        cachedAt: Date.now()
    })

    return createdPlant;
}

