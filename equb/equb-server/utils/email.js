// utils/email.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((err, success) => {
  if (err) console.error("SMTP connection error:", err);
  else console.log("SMTP ready:", success);
});

export const sendOtpEmail = async (to, otp) => {
  try {
    await transporter.sendMail({
      from: `"Equb Server" <${process.env.SMTP_USER}>`,
      to,
      subject: "Your Password Reset OTP",
      text: `Your OTP code is ${otp}. It expires in 10 minutes.`,
      html: `<p>Your OTP code is <b>${otp}</b>. It expires in 10 minutes.</p>`,
    });
    console.log(`OTP sent to ${to}`);
  } catch (err) {
    console.error("Error sending OTP email:", err);
    throw err;
  }
};
