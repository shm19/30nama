const handleFactory = require('./handleFactory');
const reviewModel = require('../models/reviewModel');

module.exports.getAllReviews = handleFactory.getAll(reviewModel);

module.exports.getReview = handleFactory.getOne(reviewModel);

module.exports.createReview = handleFactory.createOne(reviewModel);

module.exports.deleteReview = handleFactory.deleteOne(reviewModel);

module.exports.updateReview = handleFactory.updateOne(reviewModel);
