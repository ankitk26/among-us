import nodemailer from "nodemailer";

export const sendMail = async (email: string, token: string) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  const testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Ankit Kumar 👻" <ankit@me.com>', // sender address
    to: email, // list of receivers
    subject: "Change password link", // Subject line
    html: `<p>Click this <a href="https://among-us-1kpe8qme5-ankitk26.vercel.app/change-password?token=${token}">link</a> to change password:</p>`, // html body
  });

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  console.log(`Message sent: ${info.messageId}`);

  // Preview only available when sending through an Ethereal account
  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
