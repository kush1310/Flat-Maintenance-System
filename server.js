// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fetch = global.fetch;

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- Serve Frontend Files ---
app.use(express.static(path.join(__dirname, ".")));
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// --- Brevo Email Sender via API ---
async function sendBrevoEmail(toEmail, subject, htmlContent) {
  const apiKey = process.env.EMAIL_PASS?.trim();

  if (!apiKey) {
    console.error("❌ Missing EMAIL_PASS (Brevo API key) in .env file");
    throw new Error("Missing Brevo API key");
  }

  console.log("📧 Attempting to send email...");
  console.log("To:", toEmail);
  console.log("Using API Key:", apiKey.slice(0, 15) + "...");

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
        email: process.env.EMAIL_USER,
      },
      to: [{ email: toEmail }],
      subject,
      htmlContent,
    }),
  });

  const text = await response.text();
  console.log("📩 Brevo Response:", response.status, text);

  if (!response.ok) {
    throw new Error(`Failed to send email via Brevo: ${response.status} ${text}`);
  }

  console.log(`✅ Email sent successfully to ${toEmail}`);
  return true;
}

// --- OTP Stores ---
let loginOtpStore = "";
let forgotOtpStore = "";
let settingsOtpStore = "";

// --- Helper Function: Generate OTP ---
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// --- Generic Email Sender ---
const sendEmail = async (otp, subject, toEmail = process.env.EMAIL_USER) => {
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #4f46e5;">Shreeji Complex Admin</h2>
      <p>Your One-Time Password (OTP) for verification is:</p>
      <p style="font-size: 28px; font-weight: bold; letter-spacing: 2px; color: #1e3a8a;">
        ${otp}
      </p>
      <p>This OTP is valid for 5 minutes.</p>
      <p>If you did not request this, please secure your account immediately.</p>
    </div>
  `;
  return await sendBrevoEmail(toEmail, subject, html);
};

// --- Send Receipt Email ---
const sendReceiptEmail = async (receiptData) => {
  const { flatNumber, emails, date, months, year, amount, mode, remarks } = receiptData;

  const htmlReceipt = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #4f46e5;">Payment Received - Flat ${flatNumber}</h2>
      <p>Dear Resident,</p>
      <p>We have successfully received a maintenance payment for your flat. Here are the details:</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr><td>Payment Date:</td><td style="text-align:right;">${date}</td></tr>
        <tr><td>Amount Paid:</td><td style="text-align:right; color:#28a745; font-weight:bold;">₹${amount.toFixed(2)}</td></tr>
        <tr><td>Months Paid (for ${year}):</td><td style="text-align:right;">${months.join(", ")}</td></tr>
        <tr><td>Payment Mode:</td><td style="text-align:right;">${mode}</td></tr>
        ${remarks ? `<tr><td>Remarks:</td><td style="text-align:right;">${remarks}</td></tr>` : ""}
      </table>
      <p style="margin-top:20px; font-size:12px; color:#888;">This is an automated receipt.<br>Thank you for your payment.<br>Shreeji Complex Management</p>
    </div>
  `;

  for (const email of emails) {
    await sendBrevoEmail(email, `Maintenance Payment Received - Flat ${flatNumber}`, htmlReceipt);
  }
  return true;
};

// --- OTP & Verification Routes ---
app.post("/send-login-otp", async (req, res) => {
  loginOtpStore = generateOTP();
  try {
    await sendEmail(loginOtpStore, "Login Verification OTP");
    res.json({ success: true, message: "OTP sent successfully." });
  } catch (err) {
    console.error("❌ Error sending login OTP:", err.message);
    res.status(500).json({ success: false, message: "Failed to send OTP." });
  }
});

app.post("/verify-login-otp", (req, res) => {
  const { otp } = req.body;
  if (otp === loginOtpStore && otp) {
    loginOtpStore = "";
    res.json({ success: true, message: "Login successful." });
  } else {
    res.status(400).json({ success: false, message: "Invalid or expired OTP." });
  }
});

app.post("/send-forgot-otp", async (req, res) => {
  forgotOtpStore = generateOTP();
  try {
    await sendEmail(forgotOtpStore, "Password Reset OTP");
    res.json({ success: true, message: "OTP sent successfully." });
  } catch (err) {
    console.error("❌ Error sending forgot OTP:", err.message);
    res.status(500).json({ success: false, message: "Failed to send OTP." });
  }
});

app.post("/verify-forgot-otp", (req, res) => {
  const { otp } = req.body;
  if (otp === forgotOtpStore && otp) {
    forgotOtpStore = "";
    res.json({ success: true, message: "Verification successful." });
  } else {
    res.status(400).json({ success: false, message: "Invalid or expired OTP." });
  }
});

app.post("/send-settings-otp", async (req, res) => {
  settingsOtpStore = generateOTP();
  try {
    await sendEmail(settingsOtpStore, "Settings Change Verification OTP");
    res.json({ success: true, message: "OTP sent successfully." });
  } catch (err) {
    console.error("❌ Error sending settings OTP:", err.message);
    res.status(500).json({ success: false, message: "Failed to send OTP." });
  }
});

app.post("/verify-settings-otp", (req, res) => {
  const { otp } = req.body;
  if (otp === settingsOtpStore && otp) {
    settingsOtpStore = "";
    res.json({ success: true, message: "Verification successful." });
  } else {
    res.status(400).json({ success: false, message: "Invalid or expired OTP." });
  }
});

app.post("/send-receipt", async (req, res) => {
  try {
    await sendReceiptEmail(req.body);
    res.json({ success: true, message: "Receipt sent successfully." });
  } catch (err) {
    console.error("❌ Error sending receipt:", err.message);
    res.status(500).json({ success: false, message: "Failed to send receipt." });
  }
});

// --- Start Server ---
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("⚠️ EMAIL_USER or EMAIL_PASS missing in environment variables!");
  }
});
