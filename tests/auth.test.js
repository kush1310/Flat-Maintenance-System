// tests/auth.test.js
/**
 * Security and authentication validation script.
 * Verifies password encryption hashing and token verification algorithms.
 */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "test-secret-key-for-security-check";

function runAuthTest() {
  console.log("⚙️ Starting authentication security tests...");

  // 1. Password hashing checks
  const password = "admin_secure_password";
  console.log("Hashing password...");
  const hash = bcrypt.hashSync(password, 12);
  console.log("Generated Hash:", hash.slice(0, 30) + "...");

  const matchCorrect = bcrypt.compareSync(password, hash);
  const matchIncorrect = bcrypt.compareSync("wrong_password", hash);

  if (!matchCorrect) {
    console.error("❌ Test failed: Hashed password did not match.");
    process.exit(1);
  }
  if (matchIncorrect) {
    console.error("❌ Test failed: Incorrect password matched successfully.");
    process.exit(1);
  }
  console.log("✅ Hashing algorithms function correctly.");

  // 2. JWT Signature checks
  console.log("Signing session token...");
  const payload = { username: "admin", role: "admin" };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  console.log("Token generated.");

  console.log("Verifying token...");
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.username !== "admin" || decoded.role !== "admin") {
      throw new Error("Payload mismatch.");
    }
    console.log("✅ JWT signature encoding/decoding verified.");
  } catch (err) {
    console.error("❌ Test failed: JWT signature validation failed:", err.message);
    process.exit(1);
  }

  console.log("✅ Authentication checks passed successfully.");
  process.exit(0);
}

runAuthTest();
