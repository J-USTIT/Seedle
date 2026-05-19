import express from 'express';
import { getAllDevelopers } from '../controllers/developerController.js';

const developerRoute = express.Router();

developerRoute.get("/developers", getAllDevelopers);

export default developerRoute;
