exports.getLikes = (req, res, next) => {
  res.render('index');
};

exports.fetchUserNames = (req, res, next) => {
  const { url, username, password } = req.body;
  console.log(url, username, password);
};
