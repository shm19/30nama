const express = require('express');

const viewController = require('../controller/viewController');
const authController = require('../controller/authController');

const router = express.Router();

router.use('/', authController.isLoggedIn);

router.get('/home', viewController.home);

router.get('/login', viewController.login);
router.get('/logout', authController.logout);
router.get('/me', authController.isLoggedIn, viewController.getMe);

router.get('/movies/:slug', viewController.getMovie);
module.exports = router;
