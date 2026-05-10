import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

import userRoute from "./routes/userRoute.js";
import plantRoute from "./routes/plantRoute.js";
import authRoute from "./routes/authRoute.js";

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
app.use("/api", userRoute); 
app.use("/api", plantRoute); 
app.use("/api", authRoute); 
