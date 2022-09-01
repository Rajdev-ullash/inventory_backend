var nodemailer = require("nodemailer");

const SendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {
  let transporter = nodemailer.createTransport({
    host: `${process.env.mail_host}`,
    port: 25,
    secure: false,
    auth: {
      user: `${process.env.mail_user}`,
      pass: `${process.env.mail_pass}`,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: "Inventory <info@teamrabbil.com>",
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
  };

  return await transporter.sendMail(mailOptions);
};
module.exports = SendEmailUtility;
