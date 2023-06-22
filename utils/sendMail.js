const nodemailer = require("nodemailer");
require("dotenv").config();

const { GMAIL_USER, GMAIL_PASSWORD } = process.env;

const transport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASSWORD,
  },
});

const sendMail = async (mailDetails, callback) => {
  try {
    const info = await transport.sendMail(mailDetails);
    callback(info);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendMail };
