import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

import route from "./routes/userRoute.js";

const corsOptions = {
    origin: ["http://localhost:5173"],
}

const app = express(); // Initializes express

app.use(cors(corsOptions)); 
app.use(bodyParser.json()); // Sets up body parsing


dotenv.config(); // Loads variables from the .env file, making it usable with process.env

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

// Initiates the connection to the database via Mongoose
mongoose
    .connect(MONGOURL)
    .then(()=>{
        console.log("DB Connected Successfully!");

        // When successful, it starts listening to any HTTP request 
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => console.log("DB ERROR: ", error));


// SETTING API ROUTES FOR FRONTEND
app.use("/api", route); 


app.get("/api/plant/:id", async (req, res) => {
    try {
        const trefleURL = `https://trefle.io/api/v1/plants/${req.params.id}?token=${process.env.TREFLE_TOKEN}`;
        
        const response = await fetch(trefleURL);
        const data = await response.json();

        res.json(data);
    } catch (error) {
        res.status(500).json({errorMessage: "Failed to fetch plant data."});
    }
});




app.get("/api/plants", async (req, res) => {
    try {
        const trefleURL = `https://trefle.io/api/v1/plants?token=${process.env.TREFLE_TOKEN}`;

        const response = await fetch(trefleURL);
        const data = await response.json();

        res.json(data);
    } catch (error) {
        res.status(500).json({errorMessage: "Failed to fetch plant data."});
    }
});

app.get("/api/plants/search", async (req, res) => {
    try {
        const { q, f, s } = req.query;
        const trefleURL = `https://trefle.io/api/v1/plants/search?token=${process.env.TREFLE_TOKEN}&q=${q}&order[common_name]=${s}`;
        console.log(trefleURL);

        const response = await fetch(trefleURL);
        const data = await response.json();

        res.json(data);

    } catch (error) {
        res.status(500).json({errorMessage: "Failed to fetch plant data."});
    }
});