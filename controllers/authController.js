const User = require("../models/userModel");
const jwt = require("jsonwebtoken")


const createToken = (user)=>{
  const token = jwt.sign({id:user._id},process.env.JWT_SECRET_CODE,{
    expiresIn:process.env.JWT_EXPIRES_IN
  })


return token
}

exports.signup = async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword
    });

    const token = createToken(user)

    res.status(200).json({
      status: "success",
      token,
      user:{
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role
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
    const token = createToken(user)

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
      user:{
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role
      }
    });
  } catch (error) {
    res.status(401).json({
      status: "failed",
      error
    });
  }
};
