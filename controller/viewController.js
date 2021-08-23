const catchAsync = require('../utils/catchAsync');
const ApiFeatures = require('../utils/apiFeatures');
const movieModel = require('../models/movieModel');

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
  // res.status(200).json({ status: 'sucess', data: { movie } });
  console.log(movie.time.split('-')[0]);
  console.log(movie.time.split('-')[1]);
  res.render('movie.pug', { movie });
});
