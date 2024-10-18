const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  small_description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  posted_by: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;