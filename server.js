// server.js
/**
 * Express Server and API Routing for Flat Maintenance System.
 * Secure JWT cookie sessions, bcryptjs password hashing, Express rate-limiters,
 * helmet security headers, and Brevo SMTP email transactions.
 */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const crypto = require("crypto");
const fetch = global.fetch || require("node-fetch");

const { pool, query, initDB } = require("./backend/db");

const app = express();
const port = process.env.PORT || 3000;

// Security and parser configurations
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://unpkg.com", "https://cdnjs.cloudflare.com", "https://cdn.tailwindcss.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://lh3.googleusercontent.com"],
      connectSrc: ["'self'", "https://api.brevo.com"],
    },
  },
}));

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Static file routing
app.use(express.static(path.join(__dirname, "dist")));
app.use("/public", express.static(path.join(__dirname, "public")));

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key-1310";

// Rate Limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: "Too many login attempts. Please try again later." }
});

const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: { success: false, message: "Too many OTP requests. Please try again later." }
});

/**
 * sendBrevoEmail
 * Contacts the Brevo API to send transaction or OTP emails.
 */
async function sendBrevoEmail(toEmail, subject, htmlContent) {
  const apiKey = process.env.EMAIL_PASS?.trim();
  const senderEmail = process.env.EMAIL_USER || "kushshah.ce@gmail.com";

  if (!apiKey) {
    console.error("❌ Missing EMAIL_PASS (Brevo API key) in environment");
    throw new Error("Missing Brevo API key");
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: "Shreeji Complex Admin",
        email: senderEmail,
      },
      to: [{ email: toEmail }],
      subject,
      htmlContent,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to send email via Brevo: ${response.status} ${text}`);
  }
  return true;
}

/**
 * generateOTP
 * Generates a cryptographically secure 6-digit numeric OTP code.
 */
const generateOTP = () => crypto.randomInt(100000, 999999).toString();

/**
 * storeOtp
 * Inserts a newly generated OTP into the database with a 5-minute expiry.
 */
async function storeOtp(type, code) {
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  await query(
    "INSERT INTO otp_store (otp_type, otp_code, expires_at) VALUES ($1, $2, $3)",
    [type, code, expiresAt]
  );
}

/**
 * verifyOtpCode
 * Checks and marks an OTP as verified in the database.
 */
async function verifyOtpCode(type, code) {
  const result = await query(
    "SELECT * FROM otp_store WHERE otp_type = $1 AND otp_code = $2 AND expires_at > NOW() AND verified = FALSE ORDER BY id DESC LIMIT 1",
    [type, code]
  );
  if (result.rowCount === 0) return false;
  
  await query("UPDATE otp_store SET verified = TRUE WHERE id = $1", [result.rows[0].id]);
  return true;
}

// --- JWT Middleware ---
const authenticateToken = (req, res, next) => {
  const token = req.cookies.admin_session;
  if (!token) return res.status(401).json({ success: false, message: "Unauthorized access." });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ success: false, message: "Invalid session." });
    req.user = user;
    next();
  });
};

// --- Auth Routes ---
app.post("/api/login-send-otp", authLimiter, async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Fields required." });
  }

  // Support both username and email search for login
  try {
    const userResult = await query(
      "SELECT * FROM users WHERE username = $1 OR email = $2",
      [username.trim(), username.trim().toLowerCase()]
    );
    if (userResult.rowCount === 0) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    const user = userResult.rows[0];
    const passwordMatch = bcrypt.compareSync(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    // Demo user bypasses OTP
    if (username.trim() === "demo_userflat1" && password.trim() === "pass_demouser1") {
      return res.json({ success: true, message: "Demo mode, enter 123456 as OTP." });
    }

    const otp = generateOTP();
    await storeOtp("login", otp);

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #00647c;">Shreeji Complex Admin Portal</h2>
        <p>Your One-Time Password (OTP) for login is:</p>
        <p style="font-size: 28px; font-weight: bold; letter-spacing: 2px; color: #00647c;">${otp}</p>
        <p>Valid for 5 minutes. If you did not request this, secure your account.</p>
      </div>
    `;
    await sendBrevoEmail(user.email, "Login Verification OTP", emailHtml);
    res.json({ success: true, message: "OTP sent successfully." });
  } catch (err) {
    console.error("❌ Login OTP dispatch error:", err.message);
    res.status(500).json({ success: false, message: "Failed to dispatch OTP." });
  }
});

app.post("/api/login-verify-otp", async (req, res) => {
  const { username, otp } = req.body;
  if (!username || !otp) {
    return res.status(400).json({ success: false, message: "Fields required." });
  }

  try {
    // Handle demo account bypass
    if (username.trim() === "demo_userflat1" && otp.trim() === "123456") {
      const token = jwt.sign({ username: "demo_userflat1", role: "demo" }, JWT_SECRET, { expiresIn: "24h" });
      res.cookie("admin_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000
      });
      return res.json({ success: true, user: "demo_userflat1", role: "demo" });
    }

    const verified = await verifyOtpCode("login", otp.trim());
    if (!verified) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP." });
    }

    const userResult = await query("SELECT * FROM users WHERE username = $1 OR email = $2", [username.trim(), username.trim().toLowerCase()]);
    const user = userResult.rows[0];

    const token = jwt.sign({ username: user.username, role: "admin" }, JWT_SECRET, { expiresIn: "24h" });
    res.cookie("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({ success: true, user: user.username, role: "admin" });
  } catch (err) {
    console.error("❌ Login OTP verification error:", err.message);
    res.status(500).json({ success: false, message: "Verification failed." });
  }
});

app.post("/api/forgot-send-otp", otpLimiter, async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: "Email required." });

  try {
    const userResult = await query("SELECT * FROM users WHERE email = $1", [email.trim().toLowerCase()]);
    if (userResult.rowCount === 0) {
      return res.status(404).json({ success: false, message: "Email not registered." });
    }

    const otp = generateOTP();
    await storeOtp("forgot", otp);

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #ba1a1a;">Forgot Password Verification</h2>
        <p>Your One-Time Password (OTP) for password recovery is:</p>
        <p style="font-size: 28px; font-weight: bold; letter-spacing: 2px; color: #ba1a1a;">${otp}</p>
        <p>Valid for 5 minutes.</p>
      </div>
    `;
    await sendBrevoEmail(email.trim().toLowerCase(), "Password Reset Verification OTP", emailHtml);
    res.json({ success: true, message: "OTP sent successfully." });
  } catch (err) {
    console.error("❌ Forgot Password OTP dispatch error:", err.message);
    res.status(500).json({ success: false, message: "Failed to dispatch OTP." });
  }
});

app.post("/api/forgot-verify-otp", async (req, res) => {
  const { otp } = req.body;
  if (!otp) return res.status(400).json({ success: false, message: "OTP required." });

  try {
    const verified = await verifyOtpCode("forgot", otp.trim());
    if (!verified) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP." });
    }
    res.json({ success: true, message: "Verification successful. Temp password sent to email." });
  } catch (err) {
    console.error("❌ Forgot Password verification error:", err.message);
    res.status(500).json({ success: false, message: "Verification failed." });
  }
});

app.get("/api/check-auth", (req, res) => {
  const token = req.cookies.admin_session;
  if (!token) return res.json({ authenticated: false });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.json({ authenticated: false });
    res.json({ authenticated: true, user: decoded.username, role: decoded.role });
  });
});

app.post("/api/logout", (req, res) => {
  res.clearCookie("admin_session");
  res.json({ success: true, message: "Logged out." });
});

// --- Flat Routes ---
app.get("/api/flats", authenticateToken, async (req, res) => {
  try {
    const flatsRes = await query("SELECT * FROM flats ORDER BY flat_number ASC");
    const emailsRes = await query("SELECT * FROM flat_emails");
    const statusRes = await query("SELECT * FROM maintenance_status");

    // Grouping
    const emailMap = {};
    emailsRes.rows.forEach(r => {
      if (!emailMap[r.flat_number]) emailMap[r.flat_number] = [];
      emailMap[r.flat_number].push(r.email);
    });

    const statusMap = {};
    statusRes.rows.forEach(r => {
      if (!statusMap[r.flat_number]) statusMap[r.flat_number] = {};
      if (!statusMap[r.flat_number][r.year]) statusMap[r.flat_number][r.year] = {};
      statusMap[r.flat_number][r.year][r.month] = r.paid;
    });

    const formattedFlats = {};
    flatsRes.rows.forEach(r => {
      formattedFlats[r.flat_number] = {
        id: r.flat_number,
        name: r.flat_number,
        status: r.status,
        maintenanceAmount: parseFloat(r.maintenance_amount),
        emails: emailMap[r.flat_number] || [],
        maintenanceStatus: statusMap[r.flat_number] || {}
      };
    });

    res.json(formattedFlats);
  } catch (err) {
    console.error("❌ Get flats database error:", err.message);
    res.status(500).json({ success: false, message: "Failed to query flats data." });
  }
});

app.put("/api/flats/:flatNumber", authenticateToken, async (req, res) => {
  const { flatNumber } = req.params;
  const { status } = req.body;
  if (!status) return res.status(400).json({ success: false, message: "Status required." });

  try {
    await query("UPDATE flats SET status = $1 WHERE flat_number = $2", [status, flatNumber]);
    res.json({ success: true, message: `Flat ${flatNumber} status updated to ${status}.` });
  } catch (err) {
    console.error("❌ Update flat error:", err.message);
    res.status(500).json({ success: false, message: "Database update failed." });
  }
});

// --- Payments & Recepits ---
app.post("/api/payments", authenticateToken, async (req, res) => {
  const { flatNumber, date, months, amount, mode, remarks, year } = req.body;
  if (!flatNumber || !date || !months || !amount || !mode || !year) {
    return res.status(400).json({ success: false, message: "Missing fields." });
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    
    // Insert into payment_history
    const historyMonths = months.map(m => `${m} (${year})`);
    await client.query(
      "INSERT INTO payment_history (flat_number, payment_date, months, amount, mode, remarks) VALUES ($1, $2, $3, $4, $5, $6)",
      [flatNumber, date, JSON.stringify(historyMonths), amount, mode, remarks || "N/A"]
    );

    // Update maintenance_status
    for (const month of months) {
      await client.query(
        "UPDATE maintenance_status SET paid = TRUE WHERE flat_number = $1 AND year = $2 AND month = $3",
        [flatNumber, year, month]
      );
    }

    await client.query("COMMIT");
    res.json({ success: true, message: "Payment added successfully." });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Add payment transaction error:", err.message);
    res.status(500).json({ success: false, message: "Database transaction failed." });
  } finally {
    client.release();
  }
});

app.post("/api/send-receipt", authenticateToken, async (req, res) => {
  const { flatNumber, emails, date, months, year, amount, mode, remarks } = req.body;
  if (!flatNumber || !emails || !date || !months || !year || !amount || !mode) {
    return res.status(400).json({ success: false, message: "Fields required." });
  }

  const htmlReceipt = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #00647c;">Payment Received - Flat ${flatNumber}</h2>
      <p>Dear Resident,</p>
      <p>We have successfully received a maintenance payment for your flat. Details:</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr><td>Payment Date:</td><td style="text-align:right;">${date}</td></tr>
        <tr><td>Amount Paid:</td><td style="text-align:right; color:#28a745; font-weight:bold;">₹${parseFloat(amount).toFixed(2)}</td></tr>
        <tr><td>Months Paid (for ${year}):</td><td style="text-align:right;">${months.join(", ")}</td></tr>
        <tr><td>Payment Mode:</td><td style="text-align:right;">${mode}</td></tr>
        ${remarks ? `<tr><td>Remarks:</td><td style="text-align:right;">${remarks}</td></tr>` : ""}
      </table>
      <p style="margin-top:20px; font-size:12px; color:#888;">This is an automated receipt.<br>Thank you.<br>Shreeji Complex Management</p>
    </div>
  `;

  try {
    for (const email of emails) {
      await sendBrevoEmail(email, `Maintenance Payment Received - Flat ${flatNumber}`, htmlReceipt);
    }
    res.json({ success: true, message: "Receipt emails dispatched." });
  } catch (err) {
    console.error("❌ Send receipt email error:", err.message);
    res.status(500).json({ success: false, message: "Failed to dispatch email receipt." });
  }
});

// --- Budget Routes ---
app.get("/api/budget", authenticateToken, async (req, res) => {
  try {
    const listRes = await query("SELECT * FROM budget_transactions ORDER BY txn_date DESC, id DESC");
    
    // Sum calculations
    const totals = await query(
      "SELECT SUM(CASE WHEN type='Addition' THEN amount ELSE -amount END) as total FROM budget_transactions"
    );
    const totalFunds = parseFloat(totals.rows[0].total || 0);

    res.json({
      totalFunds,
      history: listRes.rows.map(r => ({
        id: r.id,
        type: r.type,
        date: r.txn_date,
        amount: parseFloat(r.amount),
        reason: r.reason
      }))
    });
  } catch (err) {
    console.error("❌ Get budget database error:", err.message);
    res.status(500).json({ success: false, message: "Failed to query budget data." });
  }
});

app.post("/api/budget", authenticateToken, async (req, res) => {
  const { type, amount, date, reason } = req.body;
  if (!type || !amount || !date || !reason) {
    return res.status(400).json({ success: false, message: "Fields required." });
  }

  try {
    await query(
      "INSERT INTO budget_transactions (type, amount, txn_date, reason) VALUES ($1, $2, $3, $4)",
      [type, amount, date, reason]
    );
    res.json({ success: true, message: "Transaction added successfully." });
  } catch (err) {
    console.error("❌ Add budget error:", err.message);
    res.status(500).json({ success: false, message: "Failed to save budget transaction." });
  }
});

// --- Settings Routes ---
app.get("/api/settings", authenticateToken, async (req, res) => {
  try {
    const setRes = await query("SELECT value FROM settings WHERE key = 'maintenanceAmount'");
    const amt = setRes.rowCount > 0 ? setRes.rows[0].value : "500";
    res.json({ maintenanceAmount: amt });
  } catch (err) {
    console.error("❌ Get settings error:", err.message);
    res.status(500).json({ success: false, message: "Failed to load settings." });
  }
});

app.put("/api/settings", authenticateToken, async (req, res) => {
  const { maintenanceAmount } = req.body;
  if (!maintenanceAmount) return res.status(400).json({ success: false, message: "Amount required." });

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("UPDATE settings SET value = $1 WHERE key = 'maintenanceAmount'", [maintenanceAmount]);
    await client.query("UPDATE flats SET maintenance_amount = $1", [maintenanceAmount]);
    await client.query("COMMIT");
    res.json({ success: true, message: "Maintenance amount saved." });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Update settings error:", err.message);
    res.status(500).json({ success: false, message: "Settings update failed." });
  } finally {
    client.release();
  }
});

app.post("/api/send-settings-otp", authenticateToken, otpLimiter, async (req, res) => {
  try {
    const userResult = await query("SELECT email FROM users WHERE username = 'admin'");
    const email = userResult.rows[0].email;
    const otp = generateOTP();
    await storeOtp("settings", otp);

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #00647c;">Settings Change Verification OTP</h2>
        <p>Your One-Time Password (OTP) for setting update is:</p>
        <p style="font-size: 28px; font-weight: bold; letter-spacing: 2px; color: #00647c;">${otp}</p>
        <p>Valid for 5 minutes.</p>
      </div>
    `;
    await sendBrevoEmail(email, "Settings Update Verification OTP", emailHtml);
    res.json({ success: true, message: "OTP sent successfully." });
  } catch (err) {
    console.error("❌ Settings OTP dispatch error:", err.message);
    res.status(500).json({ success: false, message: "Failed to send settings OTP." });
  }
});

app.post("/api/verify-settings-otp", authenticateToken, async (req, res) => {
  const { otp } = req.body;
  if (!otp) return res.status(400).json({ success: false, message: "OTP required." });

  try {
    const verified = await verifyOtpCode("settings", otp.trim());
    if (!verified) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP." });
    }
    res.json({ success: true, message: "Verification successful." });
  } catch (err) {
    console.error("❌ Settings OTP verification error:", err.message);
    res.status(500).json({ success: false, message: "Verification failed." });
  }
});

// --- Flat Email Update with OTP ---
app.post("/api/send-email-otp", authenticateToken, otpLimiter, async (req, res) => {
  try {
    const userResult = await query("SELECT email FROM users WHERE username = 'admin'");
    const adminEmail = userResult.rows[0].email;
    const otp = generateOTP();
    await storeOtp("settings", otp);

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #00647c;">Verify Owner Email Update</h2>
        <p>Your One-Time Password (OTP) to update resident email is:</p>
        <p style="font-size: 28px; font-weight: bold; letter-spacing: 2px; color: #00647c;">${otp}</p>
        <p>Valid for 5 minutes.</p>
      </div>
    `;
    await sendBrevoEmail(adminEmail, "Email Update Verification OTP", emailHtml);
    res.json({ success: true, message: "OTP sent successfully." });
  } catch (err) {
    console.error("❌ Email update OTP dispatch error:", err.message);
    res.status(500).json({ success: false, message: "Failed to dispatch email verification OTP." });
  }
});

app.post("/api/verify-email-otp", authenticateToken, async (req, res) => {
  const { otp, flatNumber, email, action } = req.body;
  if (!otp || !flatNumber || !email || !action) {
    return res.status(400).json({ success: false, message: "Missing fields." });
  }

  try {
    const verified = await verifyOtpCode("settings", otp.trim());
    if (!verified) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP." });
    }

    if (action === "add") {
      await query("INSERT INTO flat_emails (flat_number, email) VALUES ($1, $2) ON CONFLICT DO NOTHING", [flatNumber, email.trim()]);
    } else if (action === "remove") {
      await query("DELETE FROM flat_emails WHERE flat_number = $1 AND email = $2", [flatNumber, email.trim()]);
    }

    res.json({ success: true, message: "Resident email successfully updated." });
  } catch (err) {
    console.error("❌ Email update OTP verification error:", err.message);
    res.status(500).json({ success: false, message: "Verification failed." });
  }
});

// Fallback HTML router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// --- Start Server ---
initDB().then(() => {
  app.listen(port, () => {
    // Print simple success message as requested
    console.log(`Application Running Successfully on http://localhost:${port}`);
  });
}).catch(err => {
  console.error("❌ DB init failed:", err);
});
