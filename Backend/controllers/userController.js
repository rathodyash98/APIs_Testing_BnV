const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandling");
const tryCatchError = require("../middleware/tryCatch");
const sendToken = require("../utils/jwtTokens");
const crypto = require("crypto");

// User Register
exports.register = tryCatchError(async (req, res, next) => {
  const { email, password, avatar, mobile, name } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is avatar",
      url: "lsdfknsd",
    },
    mobile,
  });
  // Uncomment below line if you want to log in the user immediately after registration
  //   const token = userRegister.getJWTToken();
  sendToken(user, 201, res);
});

// Login
exports.login = tryCatchError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return next(new ErrorHandler("Please Enter Email", 400));
  }
  if (!password) {
    return next(new ErrorHandler("Please Enter Password", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email", 401));
  }
  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid Password", 401));
  }

  sendToken(user, 200, res);
});

// Logout
exports.logout = tryCatchError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    HttpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Loged Out Successfuly",
  });
});

// Get User Details
exports.getUserDetails = tryCatchError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});


// Get all User Only Admit can access this api
exports.getAllUsers = tryCatchError(async (req, res, next) => {
  const allUser = await User.find({});

  if (!allUser) {
    return next(new ErrorHandler("No Users found", 400));
  }
  res.status(200).json({
    success: true,
    allUser,
  });
});

// Get single user details Only Admit can access this api
exports.getUser = tryCatchError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler(`User Does Not exits: ${req.params.id}`));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

// Update user role only admin can access this api
exports.updateUserRole = tryCatchError(async (req, res, next) => {
  const updateRole = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, updateRole, {
    new: true,
  });
  if (!user) {
    return next(
      new ErrorHandler(`User does not exits with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
  });
});

// Delete user only admin can access this api.
exports.deleteUser = tryCatchError(async (req, res, next) => { 
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not exits with Id: ${req.params.id}`)
    );
  }
  await User.deleteOne({ _id: id });
  res.status(200).json({
    success: true,
    message: "User deleted Succesfuly",
  });
});
