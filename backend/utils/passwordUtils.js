import argon2id from "argon2id";

/**
 * Plaintext -> hashed by argon2id
 * @param {string} password turns plaintext password to hashed
 * @returns {Promise<string>} hashed password
 */

export const hashPass = async (password) => {
    try {
        const hashedPass = await argon2id.hash(password);
        return  hashedPass;
    } catch (err) {
        throw new Error("Error hashing password: " + err.message);
    }
};

/**
 * Compares and verifies plaintext with hashed
 * @param {string} password  the plaintext
 * @param {string} hashedPass the hashed
 * @returns {Promise<boolean>} the checker, true if match, false if falase
 */

export const verifyPass = async (password, hashedPass) => {
    try {
        const isValid = await argon2id.verify(hashedPass, password);
        return isValid;
    } catch (err) {
        throw new Error("Error verifying password: " + err.message);
    }
}