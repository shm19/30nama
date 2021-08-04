// Takes AppError instance
const sendDevError = (err, req, res) => {
  console.log(err);
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};
module.exports = (err, req, res, next) => {
  sendDevError(err, req, res);
};
