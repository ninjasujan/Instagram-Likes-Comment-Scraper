const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  time: Date,
  replies: [{ name: String, text: String, timestamp: Date }],
});

module.export = mongoose.model('Comment', commentSchema);
