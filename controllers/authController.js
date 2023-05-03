const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Email = require("../utils/email");

const createToken = (user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_CODE, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  return token;
};

exports.signup = async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword
    });

    await new Email(user).sendWelcome()

    const token = createToken(user);

    res.status(200).json({
      status: "success",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(401).json({
      status: "failed",
      error
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Check email and password is exist
    if (!email || !password) {
      res.status(400).json({
        status: "failed",
        error: "Please provide email and password!"
      });
      return;
    }

    // 2) Check if user exist and password is correct
    const user = await User.findOne({ email }).select("+password");
    const token = createToken(user);

    if (!user || !(await user.correctPassword(password, user.password))) {
      res.status(401).json({
        status: "failed",
        error: "Incorrect email or password!"
      });
      return;
    }

    // 3) Finally send token to client
    res.status(200).json({
      status: "success",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(401).json({
      status: "failed",
      error
    });
  }
};

exports.logout = (req, res) => {
  res.status(200).json({
    status: "success"
  });
};

exports.forgotPassword = async (req, res) => {
  // 1) Check user is exist base on posted email
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(404).json({
      status: "failed",
      error: "There is no user found with this email"
    });
    return;
  }

  //  2) Generate random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user email
  try {
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${resetToken}`;
    await new Email(user, resetURL).sendPasswordReset()
    res.status(200).json({
      status: "success",
      message:"Token send to the Email!"
    })
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    res.status(500).json({
      status: "failed",
      error: "There was an error sending email. try again later."
    })
  }
};

exports.resetPassword = async(req, res) => {
  // 1) Get user based in the token
  const hashedToken = crypto.createHash("sha256").update(req.params.token).digest('hex')

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires:{ $gt: Date.now() }
  })

  // 2) if token has not expired, and there is user, set the new password
  if (!user) {
    res.status(400).json({
      status: "failed",
      message:"Invalid token or expired!"
    })
    return
  }
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  
  await user.save();

  res.status(200).json({
    status: "success",
    token: createToken(user),
  })

}