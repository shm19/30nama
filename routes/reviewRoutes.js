const express = require('express');

const reviewController = require('../controller/reviewController');
const authController = require('../controller/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.setMovieId, reviewController.getAllReviews)
  .post(
    authController.protect,
    reviewController.setUserId,
    reviewController.setMovieId,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
