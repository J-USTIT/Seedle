import { verifyToken } from "../utils/jwtUtils.js";

/**
 * Middleware = middleman I guess, verifies JWT from request headers
 * Checks for Authorization header with format: Bearer <token>
 * Valid, attaches user data to req.user
 * Invalid, returns 401 Unauthorized with error message
 */

export const authenticateToken = (req, res, next) => {
    try {
        // Get token from auth header
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

        // Looks for token
        if (!token) {
            return res.status(401).json({ message: "Access token required" });
        }

        //Verifies token
        const decoded = verifyToken(token);

        // Attach user data to request object
        req.user = decoded;

        //Call next() to pass control to next middleware or route handler
        next();
    } catch (err) {
        //Invalid or expired token
        return res.status(401).json({ message: err.message});
    }
};