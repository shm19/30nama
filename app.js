const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

dotenv.config({ path: path.join(__dirname, 'config.env') });

const globalErrorHandler = require('./controller/errorController');
const AppError = require('./utils/appError');
const apiRouter = require('./routes/apiRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); //not nessecerry

app.use('', (req, res, next) => {
  res.locals.page = req.query.page || 1;
  req.requestedAt = `${new Date().toLocaleTimeString()} - ${new Date().toLocaleDateString()}}`;
  next();
});

app.use('/api/v1', apiRouter);

app.use('/', viewRouter);
app.all('*', (req, res, next) =>
  next(
    new AppError(`Can't find any routes for ${req.originalUrl} on server`, 404)
  )
);

app.use(globalErrorHandler);

module.exports = app;
