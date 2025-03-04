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
profileRouter.post("/login", httpLoginUser); // POST /profile/login  - login a user    // login a user POST "/login",  // login a user POST "/login",   // login a user POST "/login",
profileRouter.get("/", httpGetUserInfo); // GET /profile/  - get user info    // get user info GET "/",  // get user info GET "/",   // get user info GET "/",
profileRouter.post("/logout", httpLogoutUser); // POST /profile/logout  - logout a user    // logout a user POST "/logout"
profileRouter.put("/", httpUpdateUserInfo); // PUT /profile/  - update user info    // update user info PUT "/",  // update user info PUT "/",   // update user info PUT "/",
profileRouter.put("/update-avatar", httpUpdateAvatar); // PUT /profile/update-avatar  - update user avatar    // update user avatar PUT "/update-avatar",  // update user avatar PUT "/update-avatar",
profileRouter.put("/update-password", httpUpdatePassword); // PUT /profile/update-password  - update user password    // update user password PUT "/update-password",  // update user password PUT "/update-password",
profileRouter.get("/:id", httpGetUserInfoById); // GET /profile/:id - get user info by ID    // get user info by ID GET "/:id",  // get user info by ID GET "/:id",
profileRouter.get("/all", httpGetAllUsers); // GET /profile/all - get all users    // get all users GET "/all",  // get all users GET "/all",
profileRouter.delete("/:id", httpDeleteUser); // DELETE /profile/:id - delete a user    // delete a user DELETE "/:id",  // delete a user DELETE "/:id",

module.exports = profileRouter;
