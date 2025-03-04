const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const addressSchema = new mongoose.Schema({
  country: { type: String, trim: true },
  city: { type: String, trim: true },
  address1: { type: String, trim: true },
  address2: { type: String, trim: true },
  zipCode: { type: String, trim: true }, // Changed to String to avoid leading-zero issues
  addressType: { type: String, trim: true },
});

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email!"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Password should be at least 6 characters long"],
      select: false, // Exclude from queries by default
    },
    phoneNumber: {
      type: String, // Changed to String to support international formats
      trim: true,
    },
    addresses: [addressSchema], // Reusing extracted schema
    role: {
      type: String,
      enum: ["user", "admin", "seller"], // Ensuring valid roles
      default: "user",
    },
    avatar: {
      public_id: { type: String, default: "" },
      url: { type: String, default: "" },
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
  },
  { collection: "profiles" },
  { timestamps: true } // Automatically manages createdAt and updatedAt
);

// 🔹 Hash password before saving
profileSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔹 Generate JWT Token
profileSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: Number(process.env.JWT_EXPIRES) || "7d",
  });
};

// 🔹 Compare password
profileSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const ProfileModel = mongoose.model("ProfileSchema", profileSchema);
module.exports = ProfileModel;
