import express from "express";
import { create, deleteUser, getAllUsers, getUserById, update } from "../controllers/userController.js";


const userRoute = express.Router();

userRoute.post("/user", create);
userRoute.get("/user/:id", getUserById);
userRoute.get("/users", getAllUsers);
userRoute.patch("/update/user/:id", update);
userRoute.delete("/user/:id", deleteUser);

export default userRoute;