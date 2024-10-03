const UserModel = require("../../../model/auth/register.user-mongo");
const path = require("path");
const {
  getExistedUser,
  createNewUser,
  getExistedEmail,
  deleteVerificationEmail,
  deleteUser,
  updateUserVerificationStatus,
} = require("../../../model/auth/register-model");
const {
  sendVerificationEmail,
} = require("../../../services/verificationEmail-service");
const bcrypt = require("bcrypt");
const {
  isEmailValid,
  isPasswordValid,
} = require("../../../config/validation-config");

async function httpRegisterUser(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ status: "ERROR", message: "Missing Credentials" });
  }

  const existedUser = await getExistedUser(email);
  if (existedUser) {
    return res.status(401).json({
      status: "ERROR",
      message: "Account Already Exists With This Email! Login Instead!",
      data: "Login Instead!",
    });
  }
  if (isEmailValid(email) && isPasswordValid(password)) {
    const newUser = await createNewUser(name, email, password);

    const emailResponse = await sendVerificationEmail(
      newUser._id,
      newUser.email
    );
    return res.status(200).json({
      status: "SUCCESS",
      message: emailResponse.message,
      data: newUser,
    });
  }
  return res.status(400).json({
    status: "ERROR",
    message: "Invalid Email Or Password",
    data: [
      "Password should be atleast 6 characters",
      "Must Include A Capital Letter",
      "Must Include Especial Charater like *,/@,#,_",
    ],
  });
}

async function httpVerifyUser(req, res) {
  let { userId, uniqueString } = req.params;

  const emailExist = await getExistedEmail(userId);

  if (!emailExist) {
    let message =
      "Account record doesn't exist or has been verified already. Please Sign Up or Log In  ";
    return res.redirect(`user/verified/error=true&message=${message}`);
  }

  const { expiresAt, uniqueString: hashedString } = emailExist;
  if (expiresAt < Date.now()) {
    // It means the record has expired and no longer active. Therefore we delete it.

    const deletedVerificationRecord = await deleteVerificationEmail(userId);
    if (deletedVerificationRecord.deletedCount === 1) {
      const user = await deleteUser({ _id: userId });
      if (user.deletedCount === 1) {
        let message = "Link has expired. Please sign up again";
        return res.redirect(`user/verified/error=true&message=${message}`);
      } else {
        let message = "Clearing user with expired unique string failed";
        return res.redirect(`user/verified/error=true&message=${message}`);
      }
    } else {
      let message =
        "An Error Occured while clearing expired user verification record";
      return res.redirect(`user/verified/error=true&message=${message}`);
    }
  } else {
    //valid record exist so we validate the user
    // first compare the hashed unique string

    const compared = bcrypt.compare(uniqueString, hashedString);
    if (compared) {
      const verifiedUser = await updateUserVerificationStatus(userId);

      if (verifiedUser.modifiedCount === 1) {
        const deletedEmailData = await deleteVerificationEmail(userId);

        if (deletedEmailData.acknowledged === true) {
          // res.sendFile(path.join(__dirname, "../../../view/verification.html"));
          res.redirect("http://127.0.0.1:5173/activation");
        }
      }
    } else {
      let message =
        "Invalid Verification Details Passed. Please Check your Inbox.";
      return res.redirect(`user/verified/error=true&message=${message}`);
    }
  }
}

module.exports = {
  httpRegisterUser,
  httpVerifyUser,
};
