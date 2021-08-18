const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: ['True', 'Review should have a user']
  },
  movie: {
    type: mongoose.Schema.ObjectId,
    ref: 'Movie',
    required: [true, 'Review should have a movie']
  },
  review: {
    type: String,
    required: [true, 'Review can not be empty']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Review should have a rating']
  },
  createdAt: {
    type: Date,
    defualt: Date.now()
  }
});

const reviewModel = reviewSchema.model('Review', reviewSchema);

module.exports = reviewModel;
