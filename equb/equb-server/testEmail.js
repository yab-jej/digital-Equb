import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config(); // make sure your .env is loaded

// Setup transporter using your .env values
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // use true only for SSL (port 465)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify SMTP connection
transporter.verify((err, success) => {
  if (err) console.error("SMTP connection error:", err);
  else console.log("SMTP connected successfully");
});

// Function to send test email
const sendTestEmail = async () => {
  try {
    const info = await transporter.sendMail({
      from: `"Equb Server" <${process.env.SMTP_USER}>`,
      to: "bombastickj452@gmail.com", // change to your real email
      subject: "Test Email from Brevo SMTP",
      text: "This is a test email to verify Brevo SMTP setup.",
      html: "<p>This is a <b>test email</b> to verify Brevo SMTP setup.</p>",
    });
    console.log("Test email sent successfully:", info.messageId);
  } catch (err) {
    console.error("Error sending test email:", err);
  }
};

sendTestEmail();
