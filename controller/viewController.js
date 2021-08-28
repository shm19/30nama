const catchAsync = require('../utils/catchAsync');
const ApiFeatures = require('../utils/apiFeatures');
const movieModel = require('../models/movieModel');
const reviewModel = require('../models/reviewModel');

exports.login = (req, res) => {
  res.status(200).render('login.pug', { title: 'Login' });
};

exports.home = catchAsync(async (req, res) => {
  const movies = await new ApiFeatures(movieModel.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate().query;
  res.status(200).render('home.pug', { title: 'Home', movies });
});

exports.getMovie = catchAsync(async (req, res) => {
  const movie = await movieModel.findOne({ slug: req.params.slug });
  const reviews = await reviewModel.find({ movie: movie.id }).populate({
    path: 'user',
    select: 'name email gender slug photo'
  });
  res.render('movie.pug', { movie, reviews });
});

exports.getMe = catchAsync(async (req, res) => {
  res.render('account.pug');
});

exports.search = catchAsync(async (req, res, next) => {
  console.log(req.body);
  return next();
});
