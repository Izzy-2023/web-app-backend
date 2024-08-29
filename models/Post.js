const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Post schema
const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a model from the schema and export it
const Post = mongoose.model('Post', postSchema);
module.exports = Post;
