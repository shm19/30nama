const express = require('express');

const movieController = require('../controller/movieController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:movieId/reviews', reviewRouter);
router
  .route('/')
  .get(movieController.getAllMovies)
  .post(movieController.createMovie);

router
  .route('/:id')
  .get(movieController.getMovie)
  .patch(movieController.updateMovie)
  .delete(movieController.deleteMovie);

module.exports = router;
