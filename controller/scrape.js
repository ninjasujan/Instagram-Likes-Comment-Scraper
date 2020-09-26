const getAllUserNames = require('../util/scrape');
const Likes = require('../models/Likes');

exports.getLikes = (req, res, next) => {
  res.render('index');
};

exports.fetchUserNames = async (req, res, next) => {
  const { url, username, password } = req.body;

  const likesInfo = await getAllUserNames(username, password, url);
  const newLikeInfo = new Likes({
    postId: url,
    likes: likesInfo.totalLikes,
    userNames: likesInfo.userNames,
  });
  await newLikeInfo.save();
  await res.render('list', likesInfo);
};
