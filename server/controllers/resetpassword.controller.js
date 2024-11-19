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
      subject: "Rechtech: Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Rechtech</h1>
            <p style="margin: 0;">Secure Your Account</p>
          </div>
          <div style="padding: 20px;">
            <p style="font-size: 16px; color: #333;">Hi,</p>
            <p style="font-size: 16px; color: #333;">
              You've recently made a request to reset your password on the Rechtech Platform. 
              Please use the OTP below to reset your password. If you didn't request this, please ignore this email.
            </p>
            <div style="text-align: center; margin: 20px 0;">
              <h2 style="font-size: 24px; color: #4CAF50; margin: 0;">${otp}</h2>
            </div>
            <p style="font-size: 14px; color: #666;">
              This OTP will expire in 10 minutes. Do not share this OTP with anyone.
            </p>
          </div>
          <div style="background-color: #f4f4f4; padding: 10px; text-align: center;">
            <p style="font-size: 12px; color: #999; margin: 0;">
              Need help? Contact us at <a href="mailto:support@rechtech.com" style="color: #4CAF50;">support@rechtech.com</a>.
            </p>
            <p style="font-size: 12px; color: #999; margin: 0;">
              © 2024 Rechtech. All rights reserved.
            </p>
          </div>
        </div>
      `,
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
