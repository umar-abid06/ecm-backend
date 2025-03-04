const {
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
} = require("../../model/profile/profile-model");
const ErrorHandler = require("../../services/ErrorHandler");
const sendToken = require("../../services/jwtToken");

async function httpCreateUser(req, res) {
  try {
    // Call the createUser function without passing `res`
    const user = await createUser(req.body);

    // Send the response with the user data
    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    // Handle error response
    return res.status(500).json({ error: error.message });
  }
}

async function httpActivateUser(req, res) {
  const { activationToken } = req.params;

  try {
    const user = await activateUser(activationToken);
    if (user) {
      sendToken(user, 200, res);
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
async function httpLoginUser(req, res, next) {
  try {
    const user = await loginUser(req.body);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
}
async function httpGetUserInfo(req, res, next) {
  try {
    const user = await getUserInfo(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
}
async function httpLogoutUser(req, res, next) {
  try {
    logoutUser(req.user.id, res);
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
}
async function httpUpdateUserInfo(req, res, next) {
  try {
    const user = await updateUserInfo(req.user.id, req.body);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
}
async function httpUpdateAvatar(req, res, next) {
  try {
    const user = await updateAvatar(req.user.id, req.body.avatar);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
}
async function httpUpdatePassword(req, res, next) {
  try {
    const user = await updatePassword(req.body);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
}
async function httpGetUserInfoById(req, res, next) {
  try {
    const user = await getUserInfoById(req.params.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
}
async function httpGetAllUsers(req, res, next) {
  try {
    const users = await getAllUsers();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
}
async function httpDeleteUser(req, res, next) {
  try {
    const user = await deleteUser(req.params.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
}
module.exports = {
  httpCreateUser,
  httpActivateUser,
  httpLoginUser,
  httpGetUserInfo,
  httpLogoutUser,
  httpUpdateUserInfo,
  httpUpdateAvatar,
  httpUpdatePassword,
  httpGetUserInfoById,
  httpGetAllUsers,
  httpDeleteUser,
};
