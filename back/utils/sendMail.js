require("dotenv").config();
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

module.exports = async (to, subject, text) => {
  const message = {
    from: process.env.EMAIL,
    to,
    subject,
    text,
  };
  await transport.sendMail(message);
};
