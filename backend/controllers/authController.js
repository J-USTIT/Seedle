import Users from "../models/userModel.js";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new Users({ username, email, password });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(400).json({message: `${field} already exists.`});
        }
        res.status(500).json({errorMessage: error.message});
    }
}