const mongoose = require("mongoose");

const UserVerificationSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    uniqueString: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: {
      type: Date,
    },
    expiresAt: {
      type: Date,
    },
  },
  {
    collection: "users-verification",
  }
);

const UserVerificationModel = mongoose.model(
  "UserVerificationSchema",
  UserVerificationSchema
);
module.exports = UserVerificationModel;
