const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const requireLogin = require('../middleware/requireLogin')

//Authorization routes
router.post('/blog/create',requireLogin, adminController.postContent);

//GET request to get list of posts
router.get('/posts',requireLogin, adminController.getPostContent);

//PUT request for comments
router.put('/comment', adminController.postComment);

//DELETE request for posts
router.delete('/posts/:id', requireLogin, adminController.deletePost);

module.exports = router;