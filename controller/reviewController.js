const handleFactory = require('./handleFactory');
const reviewModel = require('../models/reviewModel');

module.exports.setMovieId = (req, res, next) => {
  // Allow nested routes
  if (req.params.movieId) {
    req.body.movie = req.params.movieId;
    req.filter = { movie: req.params.movieId };
  }
  next();
};

module.exports.setUserId = (req, res, next) => {
  if (req.user.id) {
    req.body.user = req.user.id;
  }
  next();
};

module.exports.getAllReviews = handleFactory.getAll(reviewModel, {
  path: 'user',
  select: 'name email gender slug'
});

module.exports.getReview = handleFactory.getOne(reviewModel);

module.exports.createReview = handleFactory.createOne(reviewModel);

module.exports.deleteReview = handleFactory.deleteOne(reviewModel);

module.exports.updateReview = handleFactory.updateOne(reviewModel);
