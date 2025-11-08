// server.js
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path'); 

const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json()); 

// --- Serve Frontend Files ---
// This tells Render how to serve your files
app.use(express.static(path.join(__dirname, '.')));
app.use('/public', express.static(path.join(__dirname, 'public')));


// --- Homepage Route ---
// This sends index.html when someone visits the main URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


// --- Nodemailer Setup ---
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// --- In-Memory OTP Storage ---
let loginOtpStore = "";
let forgotOtpStore = "";
let settingsOtpStore = ""; // This was the fix

// --- Helper Functions ---
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendEmail = async (otp, subject, toEmail = "kushshah900@gmail.com") => {
  const mailOptions = {
    from: `"Shreeji Complex Admin" <${process.env.EMAIL_USER}>`,
    to: toEmail, 
    subject: subject,
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
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
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
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px 0; color: #555;">Payment Date:</td>
          <td style="padding: 12px 0; text-align: right; font-weight: bold;">${date}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px 0; color: #555;">Amount Paid:</td>
          <td style="padding: 12px 0; text-align: right; font-weight: bold; color: #28a745;">₹${amount.toFixed(2)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px 0; color: #555;">Months Paid (for ${year}):</td>
          <td style="padding: 12px 0; text-align: right; font-weight: bold;">${months.join(', ')}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px 0; color: #555;">Payment Mode:</td>
          <td style="padding: 12px 0; text-align: right; font-weight: bold;">${mode}</td>
        </tr>
        ${remarks ? `
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px 0; color: #555;">Remarks:</td>
          <td style="padding: 12px 0; text-align: right; font-weight: bold;">${remarks}</td>
        </tr>
        ` : ''}
      </table>
      
      <p style="margin-top: 25px; font-size: 12px; color: #888;">
        This is an automated receipt. Thank you for your payment.
        <br>
        Shreeji Complex Management
      </p>
    </div>
  `;

  const mailOptions = {
    from: `"Shreeji Complex Admin" <${process.env.EMAIL_USER}>`,
    to: emails.join(','), 
    subject: `Maintenance Payment Received - Flat ${flatNumber}`,
    html: htmlReceipt,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Receipt sent to: ${emails.join(',')}`);
    return true;
  } catch (error) {
    console.error("Error sending receipt email:", error);
    return false;
  }
};


// --- API Endpoints ---

// 1. Send Login OTP
app.post('/send-login-otp', async (req, res) => {
  console.log('Request received for /send-login-otp');
  loginOtpStore = generateOTP();
  const sent = await sendEmail(loginOtpStore, "Login Verification OTP");
  
  if (sent) {
    res.json({ success: true, message: 'OTP sent to admin email.' });
  } else {
    res.status(500).json({ success: false, message: 'Failed to send OTP email.' });
  }
});

// 2. Verify Login OTP
app.post('/verify-login-otp', (req, res) => {
  const { otp } = req.body;
  if (otp === loginOtpStore && loginOtpStore !== "") {
    loginOtpStore = ""; 
    res.json({ success: true, message: 'Login successful.' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid or expired OTP.' });
  }
});

// 3. Send Forgot Password OTP
app.post('/send-forgot-otp', async (req, res) => {
  console.log('Request received for /send-forgot-otp');
  forgotOtpStore = generateOTP();
  const sent = await sendEmail(forgotOtpStore, "Password Reset OTP");
  
  if (sent) {
    res.json({ success: true, message: 'OTP sent to admin email.' });
  } else {
    res.status(500).json({ success: false, message: 'Failed to send OTP email.' });
  }
});

// 4. Verify Forgot Password OTP
app.post('/verify-forgot-otp', (req, res) => {
  const { otp } = req.body;
  if (otp === forgotOtpStore && forgotOtpStore !== "") {
    forgotOtpStore = ""; 
    res.json({ success: true, message: 'Verification successful.' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid or expired OTP.' });
  }
});

// 5. Send Settings Change OTP
app.post('/send-settings-otp', async (req, res) => {
  console.log('Request received for /send-settings-otp');
  settingsOtpStore = generateOTP();
  const sent = await sendEmail(settingsOtpStore, "Settings Change Verification OTP");
  
  if (sent) {
    res.json({ success: true, message: 'OTP sent to admin email.' });
  } else {
    res.status(500).json({ success: false, message: 'Failed to send OTP email.' });
  }
});

// 6. Verify Settings Change OTP
app.post('/verify-settings-otp', (req, res) => {
  const { otp } = req.body;
  if (otp === settingsOtpStore && settingsOtpStore !== "") {
    settingsOtpStore = ""; 
    res.json({ success: true, message: 'Verification successful.' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid or expired OTP.' });
  }
});

// 7. Send Maintenance Receipt
app.post('/send-receipt', async (req, res) => {
    const receiptData = req.body;
    console.log(`Request to send receipt for Flat ${receiptData.flatNumber}`);
    
    const sent = await sendReceiptEmail(receiptData);
    
    if (sent) {
        res.json({ success: true, message: 'Receipts sent successfully.' });
    } else {
        res.status(500).json({ success: false, message: 'Failed to send receipts.' });
    }
});


app.listen(port, () => {
  console.log(`Email server listening on http://localhost:${port}`);
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("\x1b[31m%s\x1b[0m", "WARNING: EMAIL_USER or EMAIL_PASS not set in .env file. Emails will fail.");
  }
});