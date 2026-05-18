import jwt from "jsonwebtoken";

/**
 * JWT (Json Web Token) for the user
 * @param {string} userId user Mongodb ID
 * @param {string} email user email
 * @returns {string} JWT token
 */

export const generateToken = (userId, email, role) => {
        const jwtToken = jwt.sign(
            { userId, email, role }, 
            process.env.JWT_SECRET || "this-is-nothehe-your-secret",
            { expiresIn: "1d"}
        )
        return jwtToken;
};

/**
 * JWT token verification, returns decoded data
 * @param {string} token - the token
 * @returns {Object} - decoded token data (userId and email)
 * @throws {Error} - checks if token is expired or invalid
 */

export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "this-is-nothehe-your-secret"
        );
        return decoded; // { userId, email, iat, exp }
    } catch (err) {
        throw new Error("Invalid or expired token: " + err.message);
    }
};