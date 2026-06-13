// backend/db.js
/**
 * Database layer configuration and initialization for PostgreSQL.
 * Handles pooling, schema execution, and default dataset seeding.
 */
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ DATABASE_URL is missing in environment variables!");
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: connectionString.includes("localhost") || connectionString.includes("127.0.0.1")
    ? false
    : { rejectUnauthorized: false },
});

/**
 * query
 * 
 * Executes an SQL query against the PostgreSQL database pool.
 * 
 * @param  {string} text   - The SQL query text.
 * @param  {Array}  params - The parameter bindings.
 * @returns {Promise<Object>} - The query results object.
 */
async function query(text, params) {
  try {
    const res = await pool.query(text, params);
    return res;
  } catch (err) {
    console.error("Query error:", err.message, "→", text.slice(0, 120));
    throw err;
  }
}

/**
 * initDB
 * 
 * Creates schema tables and seeds default admin, flat records, and settings.
 */
async function initDB() {
  const client = await pool.connect();
  try {
    const sqlPath = path.join(__dirname, "db.sql");
    const sql = fs.readFileSync(sqlPath, "utf8");
    await client.query(sql);

    // Check and seed admin user
    const userCheck = await client.query("SELECT * FROM users WHERE username = $1", ["admin"]);
    if (userCheck.rowCount === 0) {
      const passwordHash = bcrypt.hashSync("pass", 12);
      await client.query(
        "INSERT INTO users (username, password_hash, email) VALUES ($1, $2, $3)",
        ["admin", passwordHash, "kushshah.ce@gmail.com"]
      );
    }

    // Check and seed default maintenance amount
    const settingsCheck = await client.query("SELECT * FROM settings WHERE key = $1", ["maintenanceAmount"]);
    if (settingsCheck.rowCount === 0) {
      await client.query("INSERT INTO settings (key, value) VALUES ($1, $2)", ["maintenanceAmount", "500"]);
    }

    // Check and seed flats
    const flatsCheck = await client.query("SELECT COUNT(*) FROM flats");
    const flatCount = parseInt(flatsCheck.rows[0].count, 10);

    if (flatCount === 0) {
      const floorMap = {
        "1": ["101", "102", "103", "104"],
        "2": ["201", "202", "203", "204"],
        "3": ["301", "302", "303", "304"],
        "4": ["401", "402", "403", "404"],
        "5": ["501", "502", "503", "504"],
        "6": ["601", "602", "603", "604"],
      };

      const defaultEmailMap = {
        "101": ["s22cp38@gmail.com"],
        "102": ["owner102@example.com"],
        "103": ["owner103-a@example.com", "owner103-b@example.com"],
        "104": ["owner104@example.com"],
        "201": ["owner201@example.com"],
        "202": ["owner202@example.com"],
        "203": ["owner203@example.com"],
        "204": ["owner204@example.com"],
        "301": ["owner301@example.com"],
        "302": ["owner302@example.com"],
        "303": ["kushshah900@gmail.com"],
        "304": ["owner304@example.com"],
        "401": ["owner401@example.com"],
        "402": ["owner402@example.com"],
        "403": ["owner403@example.com"],
        "404": ["owner404@example.com"],
        "501": ["owner501@example.com"],
        "502": ["owner502@example.com"],
        "503": ["owner503@example.com"],
        "504": ["owner504@example.com"],
        "601": ["owner601@example.com"],
        "602": ["owner602@example.com"],
        "603": ["owner603@example.com"],
        "604": ["owner604@example.com"],
      };

      for (const floor of Object.keys(floorMap)) {
        for (const flatNum of floorMap[floor]) {
          // Default status is 'Empty' except a few test cases or rented/owned
          // Let's seed default status as 'Owned' for demo purposes
          const status = "Owned"; 
          await client.query(
            "INSERT INTO flats (flat_number, status, maintenance_amount) VALUES ($1, $2, $3)",
            [flatNum, status, 500.00]
          );

          // Seed default emails
          const emails = defaultEmailMap[flatNum] || [];
          for (const email of emails) {
            await client.query(
              "INSERT INTO flat_emails (flat_number, email) VALUES ($1, $2)",
              [flatNum, email]
            );
          }

          // Seed maintenance status for 2023, 2024, 2025, 2026
          const years = [2023, 2024, 2025, 2026];
          const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          for (const y of years) {
            for (const m of months) {
              // Set unpaid by default
              await client.query(
                "INSERT INTO maintenance_status (flat_number, year, month, paid) VALUES ($1, $2, $3, $4)",
                [flatNum, y, m, false]
              );
            }
          }
        }
      }
    }
  } catch (err) {
    console.error("❌ Database seeding failed:", err.message);
  } finally {
    client.release();
  }
}

module.exports = {
  pool,
  query,
  initDB,
};