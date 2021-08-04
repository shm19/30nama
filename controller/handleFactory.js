const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const checkAndSend = (res, next, doc, statusCode = 200) => {
  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(statusCode).json({
    status: 'success',
    data: {
      data: doc
    }
  });
};

module.exports.getOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    checkAndSend(doc, res, next);
  });

module.exports.updateone = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true
    });
    checkAndSend(doc, res, next);
  });

module.exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  });

module.exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

// Filter , Sort , paginate , limit Fields
module.exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    const docs = await Model.find();

    if (docs.length > 0) {
      res.status(200).json({
        status: 'success',
        results: docs.length,
        data: {
          data: docs
        }
      });
    }
  });
