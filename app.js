const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');

dotenv.config({ path: path.join(__dirname, 'config.env') });

const userRouter = require('./routes/userRouter');
const globalErrorHandler = require('./controller/errorController');
const AppError = require('./utils/appError');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); //not nessecerry

app.use('', (req, res, next) => {
  req.requestedAt = `${new Date().toLocaleTimeString()} - ${new Date().toLocaleDateString()}}`;
  next();
});

app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) =>
  next(
    new AppError(`Can't find any routes for ${req.originalUrl} on server`, 404)
  )
);

app.use(globalErrorHandler);

module.exports = app;
