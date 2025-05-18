const {
  isEmailValid,
  isPasswordValid,
} = require("../../config/validation-config");
const {
  createUser,
  activateUser,
  getExistedUser,
  loginUser,
  getUserInfo,
  updateUserInfo,
  updateAvatar,
  updatePassword,
  getUserInfoById,
  getAllUsers,
  deleteUser,
} = require("../../model/profile/profile-model");

// Create User
async function httpCreateUser(req, res) {
  try {
    const { name, email, password, confirmPassword } = req.body;
    // Check for missing credentials
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        status: "ERROR",
        message: "Missing Credentials",
      });
    }

    // Check if user already exists
    const existedUser = await getExistedUser(email);
    if (existedUser) {
      return res.status(401).json({
        status: "ERROR",
        message: "Account Already Exists With This Email! Login Instead!",
        data: "Login Instead!",
      });
    }

    // Validate email and password
    if (!isEmailValid(email) || !isPasswordValid(password)) {
      return res.status(400).json({
        status: "ERROR",
        message: "Invalid Email Or Password",
        data: [
          "Password should be at least 6 characters",
          "Must include a capital letter",
          "Must include a special character like *, @, #, _",
        ],
      });
    }

    // Ensure passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "ERROR",
        message: "Passwords do not match",
        data: "Ensure password and confirm password are the same",
      });
    }

    // Create new user
    const newUser = await createUser(req.body);
    return res.status(200).json({
      status: "SUCCESS",
      message: "User registered successfully! Please verify your email.",
      data: newUser,
    });
  } catch (error) {
    return res.status(409).json({ status: "ERROR", error: error.message }); // 409 Conflict for existing user
  }
}

// async function httpCreateUser(req, res) {
//   try {
//     const result = await createUser(req.body);
//     return res.status(201).json({ success: true, ...result });
//   } catch (error) {
//     return res.status(409).json({ error: error.message }); // 409 Conflict for existing user
//   }
// }

// Activate User
async function httpActivateUser(req, res) {
  try {
    const user = await activateUser(req.params.activationToken);

    // Generate JWT token
    const token = user.getJwtToken();
    return res.redirect(
      `${process.env.FRONTEND_URL_PROD}/activation?status=verified&token=${token}`
    );
  } catch (error) {
    return res.redirect(
      `${
        process.env.FRONTEND_URL_PROD
      }/activation?status=error&message=${encodeURIComponent(error.message)}`
    );
  }
}

// Login User
async function httpLoginUser(req, res) {
  try {
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
        message:
          "This User does not Exist! Sign Up Instead Or Check Your Email!",
        data: "Sign Up Instead!",
      });
    }

    const loggedInUser = await loginUser(req.body);
    loggedInUser.password = undefined; // Remove password from response
    return res.status(200).json({ success: true, user: loggedInUser });
  } catch (error) {
    return res.status(401).json({ status: "ERROR", message: error.message }); // 401 Unauthorized for invalid login
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
