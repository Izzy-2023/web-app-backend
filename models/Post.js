// models/Post.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Post schema
const postSchema = new Schema({
  title: {
    type: String,
    required: false,
    trim: true,
  },
  content: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    // Schema.Types.ObjectId,
    // ref: 'User', // Reference to the User model
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a model from the schema and export it
const Post = mongoose.model('Post', postSchema);
module.exports = Post;
