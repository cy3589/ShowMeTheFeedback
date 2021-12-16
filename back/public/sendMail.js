const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "super60447@gmail.com",
    pass: "jdgmupemzvuydvtu",
  },
});

module.exports = (to, subject, text) =>
  new Promise((resolve, reject) => {
    const message = {
      from: "super60447@gamil.com",
      to,
      subject,
      text,
    };

    transport.sendMail(message, (err, info) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(info);
    });
  });
