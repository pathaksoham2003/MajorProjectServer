const nodemailer = require('nodemailer');

const sendVerificationEmail = async (email, token , owner) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const link = `${process.env.FRONTEND_URL}/verify-email?seller=${owner}&token=${token}`;

  await transporter.sendMail({
    from: `"Ecommerce Store" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify your Email',
    html: `<p>Click the link to verify your email: <a href="${link}">${link}</a></p>`,
  });
};

module.exports = sendVerificationEmail;
