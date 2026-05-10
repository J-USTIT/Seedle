import express from "express";
import { getAllUsers } from "../controllers/userController.js";


const userRoute = express.Router();

userRoute.get("/users", getAllUsers);

// userRoute.post("/user", create);
// userRoute.get("/user/:id", getUserById);
// userRoute.patch("/update/user/:id", update);
// userRoute.delete("/user/:id", deleteUser);

export default userRoute;