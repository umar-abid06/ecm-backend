const jwt = require("jsonwebtoken");
const ProfileModel = require("./profile-mongo");
const sendEmail = require("../../services/email-service");

const createUser = async (credentials) => {
  const { name, email, password } = credentials;

  const existingUser = await ProfileModel.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const user = { name, email, password };
  const activationToken = createActivationToken(user);
  const activationUrl = `http://localhost:${process.env.PORT}/api/v1/profile/activate-account/${activationToken}`;

  await sendEmail({
    email: user.email,
    subject: "Activate your account",
    html: `<p>Hello ${user.name}, please click <b><a href="${activationUrl}">HERE</a></b> to activate your account.</p>`,
  });

  user.password = undefined; // Remove password from response
  return {
    user,
    message: `Check your email: ${user.email} to activate your account!`,
  };
};

const createActivationToken = (user) => {
  if (!user || typeof user !== "object") throw new Error("Invalid user data");

  return jwt.sign(user, process.env.ACTIVATION_SECRET, { expiresIn: 600 });
};

const activateUser = async (activationToken) => {
  const newUser = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);
  if (!newUser) throw new Error("Invalid token");

  const { email } = newUser;
  const existingUser = await ProfileModel.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  return await ProfileModel.create(newUser);
};
async function getExistedUser(email) {
  const existedUser = await ProfileModel.findOne({ email });

  return existedUser;
}
const loginUser = async ({ email, password }) => {
  if (!email || !password) throw new Error("Missing credentials");

  const user = await ProfileModel.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password)))
    throw new Error("Invalid email or password");

  return user;
};
// load user
const getUserInfo = async (id) => {
  try {
    const user = await ProfileModel.findById(id);
    if (!user) {
      throw new Error("User does not exist");
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    throw new Error("Server error");
  }
};

const getUserInfoById = async (id) => {
  const user = await ProfileModel.findById(id);
  if (!user) throw new Error("User not found");

  return user;
};

const updateUserInfo = async (id, updates) => {
  const user = await ProfileModel.findById(id);
  if (!user) throw new Error("User not found");

  Object.assign(user, updates);
  await user.save();

  return user;
};

const updatePassword = async (
  userId,
  oldPassword,
  newPassword,
  confirmPassword
) => {
  try {
    const user = await ProfileModel.findById(userId).select("+password");
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordMatched = await user.comparePassword(oldPassword);
    if (!isPasswordMatched) {
      throw new Error("Old password is incorrect!");
    }

    if (newPassword !== confirmPassword) {
      throw new Error("Passwords don't match!");
    }

    user.password = newPassword;
    await user.save();

    return { message: "Password updated successfully!" };
  } catch (error) {
    throw new Error(error.message);
  }
};

async function updateAvatar(userId, avatarUrl) {
  try {
    const user = await ProfileModel.findByIdAndUpdate(
      userId,
      { avatar: avatarUrl },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

const deleteUser = async (id) => {
  const user = await ProfileModel.findById(id);
  if (!user) throw new Error("User not found");

  await ProfileModel.findByIdAndDelete(id);
  return { message: "User deleted successfully", deletedUser: user };
};

const getAllUsers = async () => {
  try {
    const users = await ProfileModel.find();
    return users;
  } catch (error) {
    throw new Error("Error getting all users: " + error.message);
  }
};

module.exports = {
  createUser,
  activateUser,
  getExistedUser,
  loginUser,
  getUserInfo,
  getUserInfoById,
  updateUserInfo,
  updateAvatar,
  updatePassword,
  deleteUser,
  getAllUsers,
};
