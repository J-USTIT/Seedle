import express from 'express';
import { register, login } from '../controllers/authController.js'

const authRoute = express.Router();

authRoute.post("/auth/register", register);
authRoute.post("/auth/login", login);

export default authRoute;