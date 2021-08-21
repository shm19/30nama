const mongoose = require('mongoose');
const slugify = require('slugify');

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minLength: [3, 'Name length should be more than 3 characters'],
      maxLength: [30, 'Name length should be less then this'],
      require: [true, 'Movie should have a name']
    },
    slug: String,
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

movieSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'movie',
  localField: '_id'
});

movieSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

movieSchema.pre(/findOne/, function(next) {
  this.populate({ path: 'stars', select: 'name' });
  this.populate({ path: 'reviews', select: 'user review rating' });
  next();
});

const movieModel = mongoose.model('Movie', movieSchema);

module.exports = movieModel;
