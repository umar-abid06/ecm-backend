const express = require("express");
const {
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
} = require("./profile-controller");

const profileRouter = express.Router();

profileRouter.post("/create-profile", httpCreateUser); // POST /profile/create-profile  - create a new user   // create a new user
profileRouter.get("/activate-account/:activationToken", httpActivateUser); // GET /profile/activate/:activationToken  - activate a user
profileRouter.post("/login", httpLoginUser); // POST /profile/login  - login a user
// profileRouter.get("/", httpGetUserInfo); // GET /profile/  - get user info
profileRouter.post("/logout", httpLogoutUser); // POST /profile/logout
profileRouter.put("/update/:id", httpUpdateUserInfo); // PUT /profile/update  - update user info
profileRouter.put("/update-avatar/:id", httpUpdateAvatar); // PUT /profile/update-avatar  - update user avatar
profileRouter.put("/update-password/:id", httpUpdatePassword); // PUT /profile/update-password  - update user password
profileRouter.get("/:id", httpGetUserInfoById); // GET /profile/:id - get user info by ID
profileRouter.get("/", httpGetAllUsers); // GET /profile/- get all users
profileRouter.delete("/delete-user/:id", httpDeleteUser); // DELETE /profile/:id - delete a user

module.exports = profileRouter;
