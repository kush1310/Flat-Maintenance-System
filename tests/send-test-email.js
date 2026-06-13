// tests/send-test-email.js
require("dotenv").config();
const fetch = global.fetch || require("node-fetch");

const apiKey = process.env.EMAIL_PASS?.trim();
const emailUser = process.env.EMAIL_USER || "kushshah.ce@gmail.com";

console.log("⚙️ Starting Brevo Email Diagnostic...");
console.log("Sender Email:", emailUser);
console.log("API Key length:", apiKey ? apiKey.length : 0);

if (!apiKey) {
  console.error("❌ Missing EMAIL_PASS in .env file.");
  process.exit(1);
}

async function testEmail() {
  const targetEmail = "kushshah.ce@gmail.com";
  console.log(`Attempting to send email to: ${targetEmail}`);

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "Shreeji Complex Admin Diagnostic",
          email: emailUser,
        },
        to: [{ email: targetEmail }],
        subject: "Diagnostic Test Email - Shreeji Complex",
        htmlContent: "<h3>Database migration diagnostics are functioning.</h3>",
      }),
    });

    const status = response.status;
    const body = await response.text();
    console.log(`Brevo Status Code: ${status}`);
    console.log(`Brevo Response Body: ${body}`);

    if (response.ok) {
      console.log("✅ Email sent successfully according to Brevo API!");
    } else {
      console.error("❌ Brevo API returned an error.");
    }
  } catch (err) {
    console.error("❌ Fetch exception occurred during diagnostic:", err.message);
  }
}

testEmail();
