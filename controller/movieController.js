const handleFactory = require('../controller/handleFactory');
const movieModel = require('../models/movieModel');

module.exports.getMovie = handleFactory.getOne(movieModel);
module.exports.getAllMovies = handleFactory.getAll(movieModel);
module.exports.updateMovie = handleFactory.updateOne(movieModel);
module.exports.deleteMovie = handleFactory.deleteOne(movieModel);
module.exports.createMovie = handleFactory.createOne(movieModel);

/**
 * Let's implement aggreagation for some more used routes and search
 */
