const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const slugify = require('slugify');

const schemaOption = require('../utils/schemaOptoin');

const userSchema = new mongoose.Schema(
  {
    name: schemaOption.nameObj('User'),
    slug: String,
    email: {
      type: 'string',
      required: [true, 'user should have an email'],
      unique: [true, 'each user should have a unique email'],
      validate: [validator.isEmail, 'provie a valid email']
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin'],
      message: `Role should be one of these user or admin`
    },
    gender: {
      type: String,
      required: [true, 'user should have a gender'],
      enum: ['male', 'female'],
      message: 'Gender should either male or female'
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
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpiresAt: Date,
    active: {
      type: Boolean,
      default: false,
      select: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

userSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.comparePassword = async (inputPassword, userPassword) =>
  await bcrypt.compare(inputPassword, userPassword);

userSchema.methods.createPasswordRestToken = async function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpiresAt = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
