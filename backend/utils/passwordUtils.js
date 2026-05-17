import argon2 from "argon2";

/**
 * Hashes a plaintext password using argon2 algorithm
 * @param {string} password - The plaintext password to hash
 * @returns {Promise<string>} - The hashed password
 */
export const hashPassword = async (password) => {
    try {
        const hashedPassword = await argon2.hash(password);
        return hashedPassword;
    } catch (error) {
        throw new Error("Error hashing password: " + error.message);
    }
};

/**
 * Compares a plaintext password with a hashed password
 * @param {string} password - The plaintext password from user input
 * @param {string} hashedPassword - The hashed password from database
 * @returns {Promise<boolean>} - True if passwords match, false otherwise
 */
export const comparePassword = async (password, hashedPassword) => {
    try {
        const isMatch = await argon2.verify(hashedPassword, password);
        return isMatch;
    } catch (error) {
        throw new Error("Error comparing password: " + error.message);
    }
};