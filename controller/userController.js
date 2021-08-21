const userModel = require('../models/userModel');
const handleFactory = require('./handleFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllUsers = handleFactory.getAll(userModel);
exports.getUser = handleFactory.getOne(userModel);
exports.createUser = handleFactory.createOne(userModel);
exports.deleteUser = handleFactory.deleteOne(userModel);
exports.updateUser = handleFactory.updateOne(userModel);

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updatepassword.',
        400
      )
    );
  }
  // fields that user is allowed to update
  const allowedFields = ['name', 'email'];

  const updateObj = {};

  allowedFields.forEach(el => {
    if (req.body[el]) updateObj[el] = req.body[el];
  });

  const newUser = await userModel.findByIdAndUpdate(req.user.id, updateObj, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: newUser
    }
  });
});
