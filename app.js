const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');

dotenv.config({ path: path.join(__dirname, 'config.env') });

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); //not nessecerry

module.exports = app;
