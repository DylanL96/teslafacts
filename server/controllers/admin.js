const Post = require('../models/Post');

//Get all of the posts
const getPostContent = (req, res) => {
  //Finds all of the posts
  Post.find()
    //references each user who commented on the post
    .populate('comments.postedBy')
    .populate('postedBy')
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
  //Creates a new post based upon the Post Schema
  const post = new Post({
    title: title,
    body: body,
    photo: pic,
    postedBy: req.user
  })
  //Saves the post to mongoDB
  post.save()
    .then(result => {
      // console.log(result)
      res.json({post: result})
    })
    .catch(error => {
      console.log(error)
    })
};

//Function to post comments
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

//Route for deleting post
const deletePost = (req, res) => {
  // console.log(req.params.id)
  Post.findByIdAndDelete(req.params.id)
    .then(
      res.status(200).send({
        successMessage: `Deleted Post: ${req.params.id}`
      })
    )
    .catch(error => {
      console.log(error)
    })
}

module.exports = {
  postContent,
  getPostContent,
  postComment,
  deletePost
}