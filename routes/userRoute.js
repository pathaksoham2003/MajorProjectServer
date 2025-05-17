const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.get('/verify-email', userController.verifyEmail);
router.post('/login', userController.login);
router.get('/user', userController.getUser);
router.post('/google-login', userController.googleLogin); // send email + name from frontend

module.exports = router;
