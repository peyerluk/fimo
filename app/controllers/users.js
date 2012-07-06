var User, app, appDir, before;

app = require("../config/express");

appDir = "" + __dirname + "/../..";

before = require("./middleware");

User = require("../models/user");

app.get('/users/profile', function(req, res) {
  return res.send({
    title: 'Profile',
    status: 200,
    username: "You might not be logged in, but I don't know"
  });
});
