import express from 'express';
import { register } from '../controllers/authController.js'

const authRoute = express.Router();

authRoute.post("/auth/register", register);

export default authRoute;