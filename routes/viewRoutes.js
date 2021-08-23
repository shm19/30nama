const express = require('express');

const viewController = require('../controller/viewController');
const authController = require('../controller/authController');

const router = express.Router();

router.use('/', authController.isLoggedIn);
router.get('/', (req, res) => {
  res.render('base.pug', { title: 'Home' });
});

router.get('/home', viewController.home);

router.get('/login', viewController.login);
router.get('/logout', authController.logout);

router.get('/movies/:slug', viewController.getMovie);
module.exports = router;
