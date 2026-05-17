import Users from "../models/userModel.js";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { generateToken } from "../utils/jwtUtiils.js";

/**
 * Register controller
 * User registration handling
 * A) Get username, email, password from req.body
 * B) Hash password using argon2
 * C) Creates a new user in the database
 * D) Returns created user
 */

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username  || !email || !password) {
            return res.status(400).json({ message: "Username, email, and password required"});
        }

        const hashedPass = await hashPassword(password);

        const newUser = new Users({
            username,
            email,
            password: hashedPass 
        });

        const savedUser = await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            userId: savedUser._id,
            username: savedUser.username,
            email: savedUser.email
        });

    } catch (err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0];
            return res.status(400).json({ message: `${field} already exists.` });
        }
        res.status(500).json({ 
            message: "Error registering user: " + err.message 
        });
    }
};

/**
 * Login Controller
 * User login handling
 * A) Gets email and pass from req.body
 * B) Finds user in database by email
 * C) Compares password with stored hashed pass
 * D) Valid, generates JWT and returns it
 * E) Invalid, returns "Invalid credentials" error
 */

export const login = async (req, res) => {
    try {
       const { email, password } = req.body;
       
       if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
       }

       const userExists = await Users.findOne({ email });
       if (!userExists) {
        return res.status(401).json({ message: "Invalid credentials" });
       }

       const isPasswordCorrect = await comparePassword(password, userExists.password);

       if (isPasswordCorrect) {
        const token = generateToken(userExists._id, userExists.email);
        res.status(200).json({
            message: "Login successful",
            token: token,
            userId: userExists._id,
            username: userExists.username,
            email: userExists.email
        });
       } else {
        return res.status(401).json({ message: "Invalid credentials" });
       }
    } catch (err) {
        res.status(500).json({ message: "Error logging in: " + err.message });
    }
}