const multer = require('multer');
const sharp = require('sharp');
const userModel = require('../models/userModel');
const handleFactory = require('./handleFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllUsers = handleFactory.getAll(userModel);
exports.getUser = handleFactory.getOne(userModel);
exports.createUser = handleFactory.createOne(userModel);
exports.deleteUser = handleFactory.deleteOne(userModel);
exports.updateUser = handleFactory.updateOne(userModel);

// const multerStroage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   }
// });

const multerStroage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const uploade = multer({
  storage: multerStroage,
  fileFilter: multerFilter
});

exports.uploadeUserPhoto = uploade.single('photo');

exports.resizeuserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

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

  if (req.file) updateObj.photo = req.file.filename;

  const newUser = await userModel.findByIdAndUpdate(
    req.user.id,
    updateObj,
    {
      new: true,
      runValidators: true
    }
    // () => next(new AppError('Invalid email or password'), 401)
  );
  res.status(200).json({
    status: 'success',
    data: {
      user: newUser
    }
  });
});

/**
 * This should be effected to other places
 */
exports.deleteMe = catchAsync(async (req, res, next) => {
  await userModel.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});
