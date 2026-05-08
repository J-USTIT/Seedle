import express from "express";
import { create, deleteUser, getAllUsers, getUserById, update } from "../controllers/userController.js";


const route = express.Router();

route.post("/user", create);
route.get("/user/:id", getUserById);
route.get("/users", getAllUsers);
route.patch("/update/user/:id", update);
route.delete("/user/:id", deleteUser);

export default route;