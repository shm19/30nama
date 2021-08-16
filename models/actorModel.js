const mongoose = require('mongoose');
const schemaOption = require('../utils/schemaOptoin');

const actorSchema = new mongoose.Schema(
  {
    name: schemaOption.nameObj('Actor'),
    summery: {
      type: String,
      required: [true, 'Actor should have a summery']
    },
    photo: String,
    birthDay: Date,
    awards: [String],
    description: String,
    movies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        requried: [true, 'Actor should play in some movies']
      }
    ]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

actorSchema.virtual('age').get(function() {
  const { birthDay } = this;
  const diff = new Date().getTime() - birthDay.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
});

// can't do this
// actorSchema.pre(/^find/, function(next) {
//   this.populate('movies');
//   next();
// });

const actorModel = mongoose.model('Actor', actorSchema);

module.exports = actorModel;
