const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const UserVerificationModel = require("../model/auth/register.user.verification-mongo");

async function sendVerificationEmail(_id, email) {
  // Create a transporter using Nodemailer
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASS,
    },
  });

  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log(success, " Ready for Messages");
    }
  });
  const currentUrl = `http://localhost:${process.env.PORT}/api/v1/auth/register`;

  const uniqueString = uuidv4() + _id;
  let mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Email Verification",
    html: `<p>Verify Your Email Address to complete the process of Sign Up and Log In To Your Account.</p><p>This Link <b>Expires In 6 Hours</b>.</p><p>Press 
      <a href=${
        currentUrl + "/verify/" + _id + "/" + uniqueString
      }>HERE</a> to Proceed.</p>`,
  };

  const emailSent = await transporter.sendMail(mailOptions);

  const saltRounds = 10;
  const hashedString = await bcrypt.hash(uniqueString, saltRounds);

  //set values in User Verification Collection
  const newVerificationEmail = await UserVerificationModel.create({
    userId: _id,
    uniqueString: hashedString,
    createdAt: Date.now(),
    expiresAt: Date.now() + 21600000,
  });

  if (emailSent.response.includes("OK")) {
    return {
      message: "Verification Email Sent!",
      payload: newVerificationEmail,
    };
  }
  return { message: "Verification Email Failed!" };
}

module.exports = {
  sendVerificationEmail,
};
