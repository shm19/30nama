const ApiFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const checkAndSend = (req, res, next, doc, statusCode = 200) => {
  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(statusCode).json({
    status: 'success',
    requestedAt: req.requestedAt,
    data: {
      data: doc
    }
  });
};

module.exports.getOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id).select('-__v');
    checkAndSend(req, res, next, doc);
  });

module.exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = Model.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true
    });
    checkAndSend(req, res, next, await doc);
  });

module.exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      requestedAt: req.requestedAt,
      data: null
    });
  });

module.exports.createOne = Model =>
  catchAsync(async (req, res) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      requestedAt: req.requestedAt,
      data: {
        data: doc
      }
    });
  });

// Filter , Sort , paginate , limit Fields
module.exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    const filter = req.filter || {};
    const docs = await new ApiFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate().query;
    res.status(200).json({
      status: 'success',
      results: docs.length,
      requestedAt: req.requestedAt,
      data: {
        docs
      }
    });
  });
