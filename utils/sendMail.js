import nodemailer from "nodemailer";
import logger from "../config/logger.js";

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
    from: "expertbooking@pbl.com",
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
