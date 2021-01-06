const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog');
const requireLogin = require('../middleware/requireLogin');

//Authorization routes
router.post('/create',requireLogin, blogController.postContent);

//GET request to get list of posts
router.get('/posts',requireLogin, blogController.getPostContent);

//GET request to get specific post
router.get('/posts/:id',requireLogin, blogController.specificPostContent);

//PUT request for comments
router.put('/comment', requireLogin,blogController.postComment);


module.exports = router;