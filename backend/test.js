import { hashPassword, comparePassword } from "./utils/passwordUtils.js";
import { generateToken, verifyToken } from "./utils/jwtUtils.js";

// Test password hashing and comparison
const testPasswords = async () => {
    console.log("\n=== Testing Password Utilities ===");
    const testPassword = "MyPassword123";
    
    try {
        // Hash a password
        const hashed = await hashPassword(testPassword);
        console.log("✓ Password hashed successfully");
        console.log("  Hashed:", hashed.substring(0, 30) + "...");
        
        // Compare correct password
        const isCorrect = await comparePassword(testPassword, hashed);
        console.log("✓ Correct password matches:", isCorrect);
        
        // Compare wrong password
        const isWrong = await comparePassword("WrongPassword", hashed);
        console.log("✓ Wrong password matches:", isWrong);
    } catch (error) {
        console.error("✗ Password test failed:", error.message);
    }
};

// Test JWT generation and verification
const testJWT = async () => {
    console.log("\n=== Testing JWT Utilities ===");
    
    try {
        // Generate a token
        const token = generateToken("user123", "test@example.com");
        console.log("✓ Token generated successfully");
        console.log("  Token:", token.substring(0, 30) + "...");
        
        // Verify the token
        const decoded = verifyToken(token);
        console.log("✓ Token verified successfully");
        console.log("  Decoded data:", decoded);
    } catch (error) {
        console.error("✗ JWT test failed:", error.message);
    }
};

// Run tests
console.log("Starting Backend Utility Tests...");
await testPasswords();
testJWT();
console.log("\n=== All tests completed ===\n");