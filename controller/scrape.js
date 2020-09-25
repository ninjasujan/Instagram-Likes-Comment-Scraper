const getAllUserNames = require('../util/scrape');

exports.getLikes = (req, res, next) => {
  res.render('index');
};

exports.fetchUserNames = async (req, res, next) => {
  const { url, username, password } = req.body;
  console.log(url, username, password);
  await getAllUserNames(username, password, url);
  res.end();
};
