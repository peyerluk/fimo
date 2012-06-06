# MIDDLEWARE

exports.login = (req, res, next) ->
  if req.loggedIn then next() else res.redirect("/login")