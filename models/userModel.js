const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us you name!"]
  },
  email: {
    type: String,
    required: [true, "Please provide your email!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please a valid email"]
  },
  role: {
    type: String,
    enum: ["student", "admin"],
    default: "student"
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator(el) {
        return el === this.password;
      },
      message: "Password are not the same!"
    }
  }
});

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete confirmPassword field
  this.confirmPassword = undefined;
  next();
});

// Password checking for login
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
