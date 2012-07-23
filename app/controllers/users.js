var User, app, appDir, before;

app = require("../config/express");

appDir = "" + __dirname + "/../..";

before = require("./middleware");

User = require("../models/user");

app.get('/users/profile', function(req, res) {
  if (req.user) {
    return res.send({
      title: 'Profile',
      status: 200,
      user: req.user
    });
  } else {
    return res.send({
      title: 'Profile',
      status: 404,
      message: "You might not be logged in, but I don't know."
    });
  }
});
