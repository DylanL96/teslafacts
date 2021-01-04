const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const requireLogin = require('../middleware/requireLogin')

//Authorization routes
router.post('/create',requireLogin, adminController.postContent);

//GET request to get list of posts
router.get('/posts',requireLogin, adminController.getPostContent);

//PUT request for comments
router.put('/comment', requireLogin, adminController.postComment);

module.exports = router;