const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

//POST request for sign up
router.post('/signup', authController.signupController);

//POST request for sign in
router.post('/signin', authController.signinController);

//GET request for home view
router.get('/',authController.testController );
router.get('/test', authController.anotherTest);

module.exports = router;