const express = require('express');

const movieController = require('../controller/movieController');

const router = express.Router();

router
  .route('/movies')
  .get(movieController.getAllMovies)
  .post(movieController.createMovie);

router
  .route('/movies/:id')
  .get(movieController.getMovie)
  .patch(movieController.updateMovie)
  .delete(movieController.deleteMovie);

module.exports = router;
