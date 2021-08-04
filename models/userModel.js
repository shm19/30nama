const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: 'string',
    required: [true, 'user should have a name']
  },
  email: {
    type: 'string',
    required: [true, 'user should have an email'],
    unique: [true, 'each user should have a unique email'],
    validate: [validator.isEmail, 'provie a valid email']
  },
  password: {
    type: 'string',
    minLength: [8, 'password should at least have 9 characters'],
    select: false,
    required: [true, 'user should have a password']
  },
  passwordConfirm: {
    type: 'string',
    required: [true, 'confirm your password'],
    validate: {
      validator: function(value) {
        return value === this.password;
      },
      message: 'passwordConfirm should be same as password'
    }
  }
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
