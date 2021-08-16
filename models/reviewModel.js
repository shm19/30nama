const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'True'
  }
});

const reviewModel = reviewSchema.model('Review', reviewSchema);

module.exports = reviewModel;
