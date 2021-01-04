const Post = require('../models/Post');
const mongoose = require('mongoose');

//Get all of the posts
const getPostContent = (req, res) => {
  Post.find()
    .populate('postedBy')
    .populate('comments.postedBy')
    .then(posts => {
      // console.log(posts)
      // res.json({posts: posts})
      return res.json(posts)
    })
    .catch(error => {
      console.log(error)
    })
}

//Creating post data and submitting into mongoDB
const postContent = (req, res) => {
  const {title, body, pic} = req.body;
  if(!title || !body){
    return res.status(422).json({errorMessage: 'Please add all of the fields'})
  }
  const post = new Post({
    title: title,
    body: body,
    photo: pic,
    postedBy: req.user
  })
  post.save()
    .then(result => {
      // console.log(result)
      res.json({post: result})
    })
    .catch(error => {
      console.log(error)
    })
};

const postComment = (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  }
  // console.log(req.user.username)
  Post.findByIdAndUpdate(req.body.postId, {
    $push:{comments:comment}
  }, {
    new: true
  })
  .populate('postedBy')
  .populate('comments.postedBy')
  .exec((error, result) => {
    if(error){
      return response.status(422).json({error: error})
    } else {
      // console.log(result)
      res.json(result)
    }
  })
}


module.exports = {
  postContent,
  getPostContent,
  postComment
}