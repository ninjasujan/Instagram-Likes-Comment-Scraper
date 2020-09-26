const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  postId: {
    type: String,
    required: true,
  },
  userNames: [],
  totalLikes: String,
});

module.exports = mongoose.model('Likes', likeSchema);
