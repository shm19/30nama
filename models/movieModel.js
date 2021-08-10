const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minLength: [3, 'Name length should be more than 3 characters'],
    maxLength: [30, 'Name length should be less then this'],
    require: [true, 'Movie should have a name']
  },
  productionYear: Number,
  country: String,
  director: String,
  stars: [String],
  imdbScore: Number,
  summery: String,
  ratingsAverage: {
    type: Number,
    min: [1, 'Rating must be more than 1'],
    max: [5, 'Rating must be less than 5']
  },
  ratingsQuantity: {
    type: Number,
    defualt: 0
  },
  link: String
});

const movieModel = mongoose.model('Movie', movieSchema);

module.exports = movieModel;
