const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getExistedUser } = require("../../../model/auth/register-model");

async function httpLoginUser(req, res) {
  const JWT_SECRET = process.env.JWT_SECRET;
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "ERROR",
      message: "Missing Credentials",
      data: "Kindly Enter Correct & Complete Credentials!",
    });
  }

  const user = await getExistedUser(email);

  if (!user) {
    return res.status(400).json({
      status: "ERROR",
      message: "This User does not Exist! Sign Up Instead!",
      data: "Sign Up Instead!",
    });
  }

  if (!user.verified || user.verified === false) {
    return res.status(400).json({
      status: "ERROR",
      message: "Email hasn't been Verified!",
      data: "Check Your Mailbox To Verify Your Account Or Again Register Your Account!",
    });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      JWT_SECRET
    );
    console.log(token);

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };
    return res
      .status(200)
      .cookie("token", token, options)
      .json({
        status: "SUCCESS",
        message: "Logged In Successfully!",
        token: token,
        data: {
          name: user.name,
          email: user.email,
        },
      });
  }
  return res
    .status(400)
    .json({ status: "ERROR", message: "Invalid Email or Password" });
}

module.exports = {
  httpLoginUser,
};
