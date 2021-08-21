const catchAsync = require('../utils/catchAsync');
const ApiFeatures = require('../utils/apiFeatures');
const movieModel = require('../models/movieModel');

module.exports.login = (req, res) => {
  res.status(200).render('login.pug', { title: 'Login' });
};

module.exports.home = catchAsync(async (req, res) => {
  const movies = await new ApiFeatures(movieModel.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate().query;
  res.status(200).render('home.pug', { title: 'Home', movies });
});
