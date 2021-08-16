const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minLength: [3, 'Name length should be more than 3 characters'],
    maxLength: [30, 'Name length should be less then this'],
    require: [true, 'Movie should have a name']
  },
  productionYear: {
    type: Number,
    min: [1900, 'mimiumn production year is 1900'],
    max: [
      new Date().getFullYear(),
      `maximum production year is ${new Date().getFullYear()}`
    ],
    required: [true, 'Movie should have a production year']
  },
  stars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Actor',
      requried: [true, 'movie should have casts']
    }
  ],
  country: String,
  director: {
    type: String,
    required: [true, 'Movie should have a director']
  },
  imdbScore: {
    type: Number,
    required: [true, 'Movie should have an IMDB score']
  },
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

movieSchema.pre(/^find/, function(next) {
  this.populate('stars');
  next();
});

const movieModel = mongoose.model('Movie', movieSchema);

module.exports = movieModel;
