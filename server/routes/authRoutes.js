const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

//Authorization routes
router.post('/signup', authController.signupController);
router.post('/signin', authController.signinController);
router.get('/',authController.testController )

module.exports = router;