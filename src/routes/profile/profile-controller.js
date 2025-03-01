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

async function httpCreateUser(req, res, next) {
  try {
    const user = await createUser(req.body);
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
}
async function httpActivateUser(req, res, next) {
  try {
    const user = await activateUser(req.params.token);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
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
