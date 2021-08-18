const express = require('express');

const userRouter = require('./userRoutes');
const movieRouter = require('./movieRoutes');
const actorRouter = require('./actorRoutes');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('/actors', actorRouter);
router.use('/reviews', reviewRouter);

module.exports = router;
