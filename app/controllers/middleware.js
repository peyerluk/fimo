
exports.login = function(req, res, next) {
  if (req.loggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
};
