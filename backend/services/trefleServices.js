import dotenv from "dotenv";

dotenv.config();

export const getPlantByIDService = async (id) => {
    const trefleURL = `https://trefle.io/api/v1/plants/${req.params.id}?token=${process.env.TREFLE_TOKEN}`;
    const response = await fetch(trefleURL);
    if (!response.ok) throw new Error("Treffle API error");
    return response.json();
}

export const getAllPlantsService = async () => {
    const trefleURL = `https://trefle.io/api/v1/plants?token=${process.env.TREFLE_TOKEN}`;
    const response = await fetch(trefleURL);
    if (!response.ok) throw new Error("Treffle API error");
    return response.json();
}

export const getSearchPlantsService = async (q, f ,s) => {
    const trefleURL = `https://trefle.io/api/v1/plants/search?token=${process.env.TREFLE_TOKEN}&q=${q}&order[common_name]=${s}`;
    const response = await fetch(trefleURL);
    if (!response.ok) throw new Error("Treffle API error");
    return response.json();
}