const UserModel = require("./register.user-mongo");
const UserVerificationModel = require("./register.user.verification-mongo");

async function getExistedUser(email) {
  const existedUser = await UserModel.findOne({ email });

  return existedUser;
}
async function createNewUser(name, email, password) {
  const newUser = await UserModel.create({
    name,
    email,
    password,
  });
  return newUser;
}

async function getExistedEmail(userId) {
  const existedEmail = await UserVerificationModel.findOne({ userId });
  return existedEmail;
}
async function deleteVerificationEmail(userId) {
  const deletedEmail = await UserVerificationModel.deleteOne({ userId });
  return deletedEmail;
}
async function deleteUser(userId) {
  const deletedUser = await UserModel.deleteOne({ userId });
  return deletedUser;
}
async function updateUserVerificationStatus(userId) {
  const updatedStatus = await UserModel.updateOne(
    { _id: userId },
    { verified: true }
  );
  return updatedStatus;
}

module.exports = {
  getExistedUser,
  createNewUser,
  getExistedEmail,
  deleteVerificationEmail,
  deleteUser,
  updateUserVerificationStatus,
};
