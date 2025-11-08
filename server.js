// server.js
require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

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

// --- Dynamic Nodemailer Transporter ---
// Uses Brevo SMTP if available, else falls back to Gmail for local testing.
const createTransporter = () => {
  if (process.env.EMAIL_USER && process.env.EMAIL_USER.includes("smtp-brevo.com")) {
    console.log("✅ Using Brevo SMTP configuration");
    return nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  } else {
    console.log("⚠️ Using Gmail SMTP (ensure you have App Password configured)");
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }
};

const transporter = createTransporter();

// --- OTP Stores ---
let loginOtpStore = "";
let forgotOtpStore = "";
let settingsOtpStore = "";

// --- Helper Functions ---
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendEmail = async (otp, subject, toEmail = "kush.work1310@gmail.com") => {
  const mailOptions = {
    from: `"Shreeji Complex Admin" <${process.env.SENDER_EMAIL || process.env.EMAIL_USER}>`,
    to: toEmail,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #4f46e5;">Shreeji Complex Admin</h2>
        <p>Your One-Time Password (OTP) for verification is:</p>
        <p style="font-size: 28px; font-weight: bold; letter-spacing: 2px; color: #1e3a8a;">
          ${otp}
        </p>
        <p>This OTP is valid for 5 minutes.</p>
        <p>If you did not request this, please secure your account immediately.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP sent to ${toEmail}`);
    return true;
  } catch (error) {
    console.error("❌ Error sending OTP email:", error);
    return false;
  }
};

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

  const mailOptions = {
    from: `"Shreeji Complex Admin" <${process.env.SENDER_EMAIL || process.env.EMAIL_USER}>`,
    to: emails.join(","),
    subject: `Maintenance Payment Received - Flat ${flatNumber}`,
    html: htmlReceipt,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Receipt sent to: ${emails.join(",")}`);
    return true;
  } catch (error) {
    console.error("❌ Error sending receipt email:", error);
    return false;
  }
};

// --- OTP & Email Endpoints ---
app.post("/send-login-otp", async (req, res) => {
  loginOtpStore = generateOTP();
  const sent = await sendEmail(loginOtpStore, "Login Verification OTP");
  sent ? res.json({ success: true }) : res.status(500).json({ success: false });
});

app.post("/verify-login-otp", (req, res) => {
  const { otp } = req.body;
  if (otp === loginOtpStore && otp) {
    loginOtpStore = "";
    res.json({ success: true });
  } else res.status(400).json({ success: false, message: "Invalid OTP" });
});

app.post("/send-forgot-otp", async (req, res) => {
  forgotOtpStore = generateOTP();
  const sent = await sendEmail(forgotOtpStore, "Password Reset OTP");
  sent ? res.json({ success: true }) : res.status(500).json({ success: false });
});

app.post("/verify-forgot-otp", (req, res) => {
  const { otp } = req.body;
  if (otp === forgotOtpStore && otp) {
    forgotOtpStore = "";
    res.json({ success: true });
  } else res.status(400).json({ success: false, message: "Invalid OTP" });
});

app.post("/send-settings-otp", async (req, res) => {
  settingsOtpStore = generateOTP();
  const sent = await sendEmail(settingsOtpStore, "Settings Change Verification OTP");
  sent ? res.json({ success: true }) : res.status(500).json({ success: false });
});

app.post("/verify-settings-otp", (req, res) => {
  const { otp } = req.body;
  if (otp === settingsOtpStore && otp) {
    settingsOtpStore = "";
    res.json({ success: true });
  } else res.status(400).json({ success: false, message: "Invalid OTP" });
});

app.post("/send-receipt", async (req, res) => {
  const sent = await sendReceiptEmail(req.body);
  sent ? res.json({ success: true }) : res.status(500).json({ success: false });
});

// --- Start Server ---
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS)
    console.warn("⚠️ EMAIL_USER or EMAIL_PASS missing in environment variables!");
});
