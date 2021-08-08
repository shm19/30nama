const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');

const router = express.Router();

router.use('', (req, res, next) => {
  next();
});

router.post('/signup', authController.signUp);
router.post('/login', authController.login);

router.post('/forgotpassword', authController.forgotPassword);
router.post('/updatepassword/:id', authController.updatePassword);
router.patch(
  '/resetpassword/:passwordResetToken',
  authController.resetPassword
);

router
  .route('/')
  .get(authController.protect, userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
