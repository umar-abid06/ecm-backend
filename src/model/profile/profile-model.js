const jwt = require("jsonwebtoken");
const ProfileModel = require("./profile-mongo");
// const cloudinary = require("cloudinary");
const ErrorHandler = require("../../services/ErrorHandler");
// const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendEmail = require("../../services/email-service");
const sendToken = require("../../services/jwtToken");
// const { isAuthenticated, isAdmin } = require("../middleware/auth");

// create user
const createUser = async (req, res, next) => {
  try {
    const { name, email, password, avatar } = req.body;

    const userEmail = await ProfileModel.findOne({ email });
    if (userEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }

    // const myCloud = await cloudinary.v2.uploader.upload(avatar, {
    //   folder: "avatars",
    // });

    const user = {
      name,
      email,
      password,
      //   avatar: {
      //     public_id: myCloud.public_id,
      //     url: myCloud.secure_url,
      //   },
    };

    const activationToken = createActivationToken(user);
    const activationUrl = `${process.env.BASE_URL}/activation/${activationToken}`;

    await sendMail({
      email: user.email,
      subject: "Activate your account",
      message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
    });

    res.status(201).json({
      success: true,
      message: `Please check your email: ${user.email} to activate your account!`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, { expiresIn: "5m" });
};

// activate user
const activateUser = async (req, res, next) => {
  try {
    const { activation_token } = req.body;

    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
    if (!newUser) {
      return next(new ErrorHandler("Invalid token", 400));
    }

    const { name, email, password, avatar } = newUser;
    let user = await ProfileModel.findOne({ email });

    if (user) {
      return next(new ErrorHandler("User already exists", 400));
    }

    user = await ProfileModel.create({ name, email, avatar, password });
    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// login user
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please provide all fields!", 400));
    }

    const user = await ProfileModel.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("User doesn't exist!", 400));
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return next(new ErrorHandler("Incorrect credentials", 400));
    }

    sendToken(user, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// load user
const getUserInfo = async (req, res, next) => {
  try {
    const user = await ProfileModel.findById(req.user.id);
    if (!user) {
      return next(new ErrorHandler("User doesn't exist", 400));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// log out user
const logoutUser = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.status(201).json({
      success: true,
      message: "Log out successful!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// update user info
const updateUserInfo = async (req, res, next) => {
  try {
    const { email, password, phoneNumber, name } = req.body;

    const user = await ProfileModel.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return next(new ErrorHandler("Incorrect credentials", 400));
    }

    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;

    await user.save();

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// update user avatar
const updateAvatar = async (req, res, next) => {
  try {
    const existsUser = await ProfileModel.findById(req.user.id);
    // if (req.body.avatar) {
    //   const imageId = existsUser.avatar.public_id;
    //   await cloudinary.v2.uploader.destroy(imageId);

    //   const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //     folder: "avatars",
    //     width: 150,
    //   });

    //   existsUser.avatar = {
    //     public_id: myCloud.public_id,
    //     url: myCloud.secure_url,
    //   };
    // }

    await existsUser.save();

    res.status(200).json({
      success: true,
      user: existsUser,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// update user password
const updatePassword = async (req, res, next) => {
  try {
    const user = await ProfileModel.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect!", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("Passwords don't match!", 400));
    }

    user.password = req.body.newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// find user information by ID
const getUserInfoById = async (req, res, next) => {
  try {
    const user = await ProfileModel.findById(req.params.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// all users --- for admin
const getAllUsers = async (req, res, next) => {
  try {
    const users = await ProfileModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// delete user --- admin
const deleteUser = async (req, res, next) => {
  try {
    const user = await ProfileModel.findById(req.params.id);
    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }

    // const imageId = user.avatar.public_id;
    // await cloudinary.v2.uploader.destroy(imageId);

    await ProfileModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

module.exports = {
  createUser,
  activateUser,
  loginUser,
  getUserInfo,
  logoutUser,
  updateUserInfo,
  updateAvatar,
  updatePassword,
  getUserInfoById,
  getAllUsers,
  deleteUser,
};
