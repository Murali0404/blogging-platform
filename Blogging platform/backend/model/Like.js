const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  like: {
    type: Boolean,
    required: true,
  },
}, {
  timestamps: true,
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;