const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // Bạn có thể sử dụng các dịch vụ khác như SendGrid, Mailgun, v.v.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendResetPasswordEmail = async (to, token) => {
  const resetUrl = `http://localhost:3000/reset-password/${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Password Reset',
    text: `You requested a password reset. Please click the following link to reset your password: ${resetUrl}`,
    html: `<p>You requested a password reset. Please click the following link to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendResetPasswordEmail
};