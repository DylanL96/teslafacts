const express = require('express');
const router = express.Router();
const blogController = require('../controllers/admin');
const requireLogin = require('../middleware/requireLogin');

//Authorization routes
router.post('/blog/create',requireLogin, blogController.postContent);

//GET request to get list of posts
router.get('/posts',requireLogin, blogController.getPostContent);

//PUT request for comments
router.put('/comment', requireLogin, blogController.postComment);



module.exports = router;