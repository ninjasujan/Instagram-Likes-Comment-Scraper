const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  userName: {
    type: String,
  },
});

module.exports = mongoose.model('Likes', likeSchema);
