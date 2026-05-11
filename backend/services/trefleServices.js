import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const getPlantByIDService = async (id) => {
    const trefleURL = `https://trefle.io/api/v1/species/${id}?token=${process.env.TREFLE_TOKEN}`;
    const response = await axios.get(trefleURL);
    return response.data;
}

export const getAllPlantsService = async () => {
    const trefleURL = `https://trefle.io/api/v1/plants?token=${process.env.TREFLE_TOKEN}`;
    const response = await axios.get(trefleURL);
    return response.data;
}

export const getSearchPlantsService = async (q, f ,s) => {
    const trefleURL = `https://trefle.io/api/v1/plants/search?token=${process.env.TREFLE_TOKEN}&q=${q}&order[common_name]=${s}`;
    const response = await axios.get(trefleURL);
    return response.data;
}

export const getRandomTrefleId = async (attempts = 1) => {
    // if (attempts > 5) throw new Error('Could not find a valid plant after 5 attempts.');

    console.log("Attempt", attempts);

    const params = {
        token: process.env.TREFLE_TOKEN,
    };

    // 1. Get total pages
    const { data: meta } = await axios.get('https://trefle.io/api/v1/plants', { params });
    const totalPages = parseInt(meta.links.last.split('page=')[1]);

    // 2. Pick random page
    const randomPage = Math.floor(Math.random() * totalPages) + 1;

    // 3. Fetch that page
    const { data: plantList } = await axios.get('https://trefle.io/api/v1/plants', {
        params: { ...params, page: randomPage }
    });

    // 4. Filter on our end — Trefle filtering is unreliable
    const validPlants = plantList.data.filter(p => 
        p.common_name !== null &&
        p.common_name !== '' &&
        p.image_url !== null &&
        p.image_url !== ''
    );

    if (validPlants.length === 0) return getRandomTrefleId(attempts + 1);

    const randomPlant = validPlants[Math.floor(Math.random() * validPlants.length)];


    console.log(randomPlant);
    return randomPlant.id;
    // return 77116;
};