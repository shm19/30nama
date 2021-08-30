const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.post('/forgotpassword', authController.forgotPassword);
router.patch(
  '/resetpassword/:passwordResetToken',
  authController.resetPassword
);

router.use(authController.protect);

router.patch('/updateMyPassword', authController.updateMyPassword);
router.get('/me', userController.getMe, userController.getUser);

router.patch(
  '/updateMe',
  userController.uploadeUserPhoto,
  userController.resizeuserPhoto,
  userController.updateMe
);
router.patch('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
