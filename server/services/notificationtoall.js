require("dotenv").config();
const nodemailer = require("nodemailer");

const notificationtToall = async (cases) => {
  let defaulterEmails = cases?.defaulters?.map(
    (defaulter) => defaulter.emailId
  );
  let clientEmail = cases?.clientEmail;
  let arbitratorEmail = cases?.arbitratorEmail;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: process.env.GMAIL_APP_ID,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: {
        name: "Rechtech Notifications",
        address: process.env.GMAIL_APP_ID,
      },
      to: defaulterEmails,
      subject: `Rechtech - Case Notification for Defaulters`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #d9534f;">Dear Defaulters,</h2>
          <p>We have received a new case that includes the following details:</p>
          <ul style="background: #f9f9f9; padding: 10px; border-radius: 5px;">
            <li><strong>Client Email:</strong> ${clientEmail}</li>
            <li><strong>Arbitrator Email:</strong> ${arbitratorEmail}</li>
          </ul>
          <p>Please take necessary action promptly.</p>
        </div>`,
    };
    await transporter.sendMail(mailOptions);

    const clientmailOptions = {
      from: {
        name: "Rechtech Notifications",
        address: process.env.GMAIL_APP_ID,
      },
      to: [clientEmail],
      subject: `Rechtech - Your Case Assignment Details`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #0275d8;">Dear Client,</h2>
          <p>Your case has been assigned with the following details:</p>
          <ul style="background: #f9f9f9; padding: 10px; border-radius: 5px;">
            <li><strong>Arbitrator Name:</strong> ${cases?.arbitrator}</li>
            <li><strong>Arbitrator Email:</strong> ${arbitratorEmail}</li>
          </ul>
          <p>We are here to assist you in resolving your case effectively.</p>
        </div>`,
    };
    await transporter.sendMail(clientmailOptions);

    const arbitratormailOptions = {
      from: {
        name: "Rechtech Notifications",
        address: process.env.GMAIL_APP_ID,
      },
      to: [arbitratorEmail],
      subject: `Rechtech - New Case Assigned to You`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #5cb85c;">Dear Arbitrator,</h2>
          <p>You have been assigned a new case with the following details:</p>
          <ul style="background: #f9f9f9; padding: 10px; border-radius: 5px;">
            <li><strong>Client Name:</strong> ${cases?.clientName}</li>
            <li><strong>Client Email:</strong> ${clientEmail}</li>
            <li><strong>File Name:</strong> ${cases?.fileName}</li>
          </ul>
          <p>Please review the case details and proceed accordingly.</p>
        </div>`,
    };
    await transporter.sendMail(arbitratormailOptions);

    return "Emails sent successfully";
  } catch (err) {
    throw new Error(err.message || err);
  }
};

module.exports = { notificationtToall };
