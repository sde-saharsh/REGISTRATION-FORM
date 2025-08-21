import nodemailer from 'nodemailer';
import 'dotenv/config'

const transporter = nodemailer.createTransport({
  service: 'gmail',  
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendConfirmationEmail = async (email, name) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Club Registration Confirmation',
    text: `Hello ${name},\n\nThank you for registering for our club/event!`,
  };

  await transporter.sendMail(mailOptions);
};