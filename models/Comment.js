const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subSchema = new Schema({
  text: {
    type: String,
  },
  userName: {
    type: String,
  },
  time: Date,
  replies: [{ userName: String, text: String, time: Date }],
});

const commentSchema = new Schema({
  postId: {
    type: String,
    required: true,
  },
  comments: [subSchema],
});

module.export = mongoose.model('Comment', commentSchema);
