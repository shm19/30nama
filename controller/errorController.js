const AppError = require('../utils/appError');
// Takes AppError instance

const handleDuplicateKey = err =>
  new AppError(`duplicate key error ${err.message.split('dup key')[1]}`, 400);

const sendProdError = (err, req, res) => {
  let error;
  if (err.isOperational) {
    if (err.code === 11000) {
      error = handleDuplicateKey(err);
    } else if (err.code === 1231) {
      // this else is useless
      error = handleDuplicateKey('foafjao');
    }
  }
  // we don't expect this error to happend
  error.statusCode = 500;
  error.status = 'error';
  error.message = 'Something went very wrong';

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message
  });
};

const sendDevError = (err, req, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    err,
    message: err.message,
    stack: err.stack
  });
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'production') {
    sendProdError(err, req, res);
  } else {
    sendDevError(err, req, res);
  }
};
