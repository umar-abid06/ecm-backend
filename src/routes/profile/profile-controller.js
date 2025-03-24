const {
  createUser,
  activateUser,
  loginUser,
  getUserInfo,
  updateUserInfo,
  updateAvatar,
  updatePassword,
  getUserInfoById,
  getAllUsers,
  deleteUser,
} = require("../../model/profile/profile-model");
const sendToken = require("../../services/jwtToken");

// Create User
async function httpCreateUser(req, res) {
  try {
    const result = await createUser(req.body);
    return res.status(201).json({ success: true, ...result });
  } catch (error) {
    return res.status(409).json({ error: error.message }); // 409 Conflict for existing user
  }
}

// Activate User
async function httpActivateUser(req, res) {
  try {
    const user = await activateUser(req.params.activationToken);
    sendToken(user, 200, res);
  } catch (error) {
    return res.status(400).json({ error: error.message }); // 400 Bad Request for invalid token
  }
}

// Login User
async function httpLoginUser(req, res) {
  try {
    const user = await loginUser(req.body);
    res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(401).json({ error: error.message }); // 401 Unauthorized for invalid login
  }
}

// Get User Info
async function httpGetUserInfo(req, res) {
  try {
    const user = await getUserInfo(req.user.id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(404).json({ error: error.message }); // 404 Not Found for missing user
  }
}

// Logout User
async function httpLogoutUser(req, res) {
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
    return res.status(500).json({ error: error.message });
  }
}

// Update User Info
async function httpUpdateUserInfo(req, res) {
  const id = req.params.id;
  try {
    const user = await updateUserInfo(id, req.body);
    res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(400).json({ error: error.message }); // 400 Bad Request for validation errors
  }
}

// Update Avatar
async function httpUpdateAvatar(req, res) {
  try {
    const user = await updateAvatar(req.user.id, req.body.avatar);
    res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Update Password
async function httpUpdatePassword(req, res) {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const result = await updatePassword(
      req.params.id,
      oldPassword,
      newPassword,
      confirmPassword
    );

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

// Get User by ID
async function httpGetUserInfoById(req, res) {
  try {
    const user = await getUserInfoById(req.params.id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}
// Get All Users
async function httpGetAllUsers(req, res) {
  try {
    const users = await getAllUsers();
    return res.status(200).json({ success: true, users: users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Delete User
async function httpDeleteUser(req, res) {
  try {
    const deletedUser = await deleteUser(req.params.id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      deletedUser: deletedUser.deletedUser,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
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
