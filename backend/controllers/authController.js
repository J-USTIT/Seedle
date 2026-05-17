import Users from "../models/userModel.js";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { generateToken } from "../utils/jwtUtils.js";

/**
 * REGISTER CONTROLLER
 * Handles user registration:
 * 1. Gets username, email, password from request
 * 2. Hashes the password with argon2
 * 3. Creates a new user in the database
 * 4. Returns the created user
 */
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate that required fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Username, email, and password are required" });
        }

        // Hash the password before saving to database
        const hashedPassword = await hashPassword(password);

        // Create new user with hashed password
        const newUser = new Users({ 
            username, 
            email, 
            password: hashedPassword  // Store the hashed password, NOT plaintext
        });

        // Save user to database
        const savedUser = await newUser.save();

        // Return success with user data (don't send password back)
        res.status(201).json({ 
            message: "User registered successfully",
            userId: savedUser._id,
            username: savedUser.username,
            email: savedUser.email
        });
    } catch (error) {
        // Handle duplicate email/username error
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(400).json({ message: `${field} already exists.` });
        }
        res.status(500).json({ message: "Error registering user: " + error.message });
    }
};

/**
 * LOGIN CONTROLLER
 * Handles user login:
 * 1. Gets email and password from request
 * 2. Finds user in database by email
 * 3. Compares provided password with stored hashed password
 * 4. If match: generates JWT token and returns it
 * 5. If no match: returns "Invalid credentials" error
 */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate that required fields are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user by email
        const userExists = await Users.findOne({ email });

        // If user doesn't exist, return error
        if (!userExists) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Compare the provided password with the hashed password in database
        const isPasswordCorrect = await comparePassword(password, userExists.password);

        // If passwords match, generate JWT token
        if (isPasswordCorrect) {
            // Generate JWT token with userId and email
            const token = generateToken(userExists._id, userExists.email);

            // Return success with token (frontend will store this)
            res.status(200).json({ 
                message: "Login successful",
                token: token,  // Frontend uses this token for future requests
                userId: userExists._id,
                username: userExists.username,
                email: userExists.email
            });
        } else {
            // Password doesn't match
            return res.status(401).json({ message: "Invalid credentials." });
        }

    } catch (error) {
        res.status(500).json({ message: "Error logging in: " + error.message });
    }
};