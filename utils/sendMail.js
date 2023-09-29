import nodemailer from "nodemailer";
import logger from "../config/logger.js";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c745e632f73896",
    pass: "52bf3b025bdb33",
  },
});

const sendMail = async (to, subject, text, callback = null) => {
  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error(error);
    } else {
      logger.info("Email sent: " + info.response);
      if (callback) {
        callback();
      }
    }
  });
};

export default sendMail;
