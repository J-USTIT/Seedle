import { verifyToken } from "../utils/jwtUtils.js";

export const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Access token required" });
        }

        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: err.message});
    }
};

/**
 * Role-based access middleware
 * Usage: requireRole("admin") or requireRole("admin", "moderator")
 * Must be used AFTER authenticateToken
 */
export const requireRole = (...roles) => (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
    }
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden: insufficient permissions" });
    }
    next();
};