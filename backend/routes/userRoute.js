import express from "express";
import { getAllUsers, editUser, createUser } from "../controllers/userController.js";


const userRoute = express.Router();

userRoute.get("/users", getAllUsers);
userRoute.post("/edituser", editUser);
userRoute.post("/createuser", createUser);

// userRoute.post("/user", create);
// userRoute.get("/user/:id", getUserById);
// userRoute.patch("/update/user/:id", update);
// userRoute.delete("/user/:id", deleteUser);

export default userRoute;