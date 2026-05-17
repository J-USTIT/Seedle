import express from "express";
import { getAllUsers } from "../controllers/userController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";


const userRoute = express.Router();

userRoute.get("/users", getAllUsers);

// userRoute.post("/user", create);
// userRoute.get("/user/:id", getUserById);
// userRoute.patch("/update/user/:id", update);
// userRoute.delete("/user/:id", deleteUser);

userRoute.get("/user/profile", authenticateToken, (req, res) => {
    try {
        res.status(200).json({ 
            message:  "Profile retrieved successfully",
            userId: req.user.userId,
            email: req.user.email
        });
    } catch (err) {
        res.status(500).json({ message: "Error retrieving profile: " + err.message });
    }
});

userRoute.get("/user/me", authenticateToken, (req, res) => {
    try {
        res.status(200).json({
            message: "User info retrieved successfully",
            user: req.user
        });
    } catch (err) {
        res.status(500).json({ message: "Error retrieving user info: " + err.message });
    }
});

export default userRoute;