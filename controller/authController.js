const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');

const catchAsync = require('../utils/catchAsync');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const sendMail = require('../utils/email');

const signJwt = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

// This will use signJWT and create token and send response and token
const createAndSendJWT = (user, res) => {
  const token = signJwt(user._id);

  res.cookie('jwt', token, {
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

exports.signUp = catchAsync(async (req, res) => {
  const user = await User.create(req.body);
  createAndSendJWT(user, res);
});

exports.login = catchAsync(async (req, res, next) => {
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

exports.protect = catchAsync(async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new AppError('You are not logged In', 401));
  }
  const token = req.headers.authorization.split(' ')[1];
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
  return next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'user']
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};

exports.isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return next();
    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.id);
    if (!user) return next();
    res.locals.user = user;
  } catch (err) {
    return next();
  }
  return next();
};

exports.logout = catchAsync(async (req, res, next) => {
  res.cookie('jwt', 'loggedout', {
    expiresIn: Date.now() + 1000,
    usehttp: true,
    secure: true
  });
  setTimeout(() => res.redirect('/'), 500);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // Or we can get user from token by using protect middleware which is better i guess
  const user = await User.findById(req.params.id).select('+password');
  if (!user) {
    return next(new AppError(`can't find any user with this Id`, 400));
  }
  if (!(await user.comparePassword(req.body.currentPassword, user.password))) {
    return next(new AppError(`Wrong password`, 401));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  createAndSendJWT(user, res);
});

/**
 * This function will sned resetToken created by crypto package by nodemailer to user email
 * and then save hashed resetToken into db and wait for resetPassword request by token
 */
exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  try {
    if (!user) {
      return next(new AppError('No user found with this email'), 404);
    }
    const resetToken = await user.createPasswordRestToken();
    await user.save({ validateBeforeSave: false });
    await sendMail({
      from: '30namaAdmin@gmail.com',
      to: user.email,
      subject: 'Password reset token',
      text: resetToken
    });

    res.status(200).json({
      status: 'success',
      message: 'Password reset token send to your email address'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpiresAt = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500
      )
    );
  }
};

// This function comes after forgot password and reset password by reset token
exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.passwordResetToken)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpiresAt: { $gt: Date.now() }
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired'), 400);
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpiresAt = undefined;
  await user.save();
  createAndSendJWT(user, res);
});
