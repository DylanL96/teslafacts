const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const PostSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  body:{
    type: String,
    required: true
  },
  photo:{
    type: String
  },
  comments:[{
    text: String,
    postedBy:{type: ObjectId, ref: 'User'}
  }],
  postedBy:{
    type: ObjectId,
    ref: 'User'
  }
}, {timestamps: true});
const Post = mongoose.model('Post', PostSchema);
module.exports = Post;