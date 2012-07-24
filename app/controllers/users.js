var Image, User, app, appDir, before, fs;

app = require("../config/express");

appDir = "" + __dirname + "/../..";

before = require("./middleware");

User = require("../models/user");

Image = require("../models/image");

fs = require("fs");

app.post('/users/profilePicture', function(req, res) {
  if (req.loggedIn === false) {
    return res.send({
      status: 403
    }, 403);
  }
  return fs.readFile(req.files.displayImage.path, function(err, data) {
    return Image.createProfilePicture(data, req.user, function(err, img) {
      if (err) {
        console.log(err);
        return res.send({
          status: 500
        }, 500);
      } else {
        req.user.picture = img;
        return req.user.save(function(err) {
          if (err) {
            console.log(err);
            return res.send({
              status: 500
            }, 500);
          } else {
            return res.redirect('back');
          }
        });
      }
    });
  });
});

app.get('/users/profile', function(req, res) {
  if (req.user) {
    return res.send({
      title: 'Profile',
      status: 200,
      user: req.user,
      imageUrl: Image.url(req.user.picture, "100x100")
    });
  } else {
    return res.send({
      title: 'Profile',
      status: 404,
      message: "You might not be logged in, but I don't know."
    });
  }
});
