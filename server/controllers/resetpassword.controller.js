require("dotenv").config();
const argon2 = require("argon2");
const { PASSWORDRESET } = require("../model/resetPassword.model");
const { USER } = require("../model/user.model");
const nodemailer = require("nodemailer");

const userExists = async (req, res) => {
  const { emailId } = req.body;
  try {
    let user = await USER.findOne({ emailId: emailId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: process.env.GMAIL_APP_ID,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const otpn = Math.floor(Math.random() * 9000) + 1000;
    const otp = otpn.toString();

    const mailOptions = {
      from: {
        name: "Rechtech",
        address: process.env.GMAIL_APP_ID,
      },
      to: [emailId],
      subject: "Request for Password Reset",
      html: `<b>Hi, You've recently made a request to reset your password on the Rechtech Platform.</b><h2>OTP: ${otp}</h2>`,
    };
    await transporter.sendMail(mailOptions);
    await PASSWORDRESET.deleteMany({ emailId: emailId });
    const userPassword = await PASSWORDRESET.create({
      emailId: emailId,
      otp: otp,
    });
    if (!userPassword) {
      return res.status(500).json({ message: "Internal error" });
    }
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const verifyOtp = async (req, res) => {
  const { emailId, otp } = req.body;
  try {
    const userPassword = await PASSWORDRESET.findOne({ emailId: emailId });
    if (!userPassword) {
      return res.status(404).json({ message: "User not found" });
    }
    if (userPassword.otp !== otp) {
      return res.status(401).json({ message: "Invalid OTP" });
    }
    await PASSWORDRESET.deleteMany({ emailId: emailId });
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updatepassword = async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const hash = await argon2.hash(password);
    const user = await USER.findOneAndUpdate(
      { emailId: emailId },
      { password: hash },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { userExists, verifyOtp, updatepassword };
