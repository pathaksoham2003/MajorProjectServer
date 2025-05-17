const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.get('/verify-email', authController.verifyEmail);
router.post('/login', authController.login);
router.get('/owner', authController.getOwner);
router.post('/google-login', authController.googleLogin); // send email + name from frontend

module.exports = router;
