module.exports.nameObj = docType => {
  return {
    type: String,
    trim: true,
    minLength: [3, 'Name length should be more than 3 characters'],
    maxLength: [30, 'Name length should be less then this'],
    require: [true, `${docType} should have a name`]
  };
};
