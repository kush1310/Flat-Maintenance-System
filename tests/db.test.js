// tests/db.test.js
/**
 * Database connection verification script.
 * Verifies connectivity to the cloud PostgreSQL database using DATABASE_URL.
 */
require("dotenv").config();
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ Test failed: DATABASE_URL is missing in environment variables (.env).");
  process.exit(1);
}

console.log("Connecting to database using URL:", connectionString.slice(0, 25) + "...");

const pool = new Pool({
  connectionString,
  ssl: connectionString.includes("localhost") || connectionString.includes("127.0.0.1")
    ? false
    : { rejectUnauthorized: false }
});

async function runTest() {
  const start = Date.now();
  try {
    const res = await pool.query("SELECT NOW(), version();");
    const duration = Date.now() - start;
    console.log("✅ Database connection successful!");
    console.log("Database Time:", res.rows[0].now);
    console.log("Engine Version:", res.rows[0].version);
    console.log(`Round-trip duration: ${duration}ms`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
}

runTest();
