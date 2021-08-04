/**
 * reset password
 * update password
 * protect
 */
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

const signJwt = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

const createAndSendJWT = (user, res) => {
  const token = signJwt(user._id);

  res.cookie('jwt', process.env.JWT_SECRET, {
    expiresIn:
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    usehttp: true,
    secure: true
  });
  user.password = undefined;
  res.status(200).json({
    status: 'success',
    token,
    data: {
      data: user
    }
  });
};

module.exports.signUp = catchAsync(async (req, res) => {
  const user = await User.create(req.body);
  createAndSendJWT(user, res);
});

module.exports.login = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password'));
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new AppError('Invalid email or password'), 401);
  }
  createAndSendJWT(user, res);
});

module.exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(new AppError('You are not logged In', 401));
  }
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await User.findById(decode.id);
  if (!user) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }
  // you should also check if user changed it password after reciving this token by passwordChangedAt field
  req.user = user;
  next();
});
// module.exports.updatePassword = catchAsync(async (req, res, next) => {
//   const { password } = req.body;

// });
