var Image, app, appDir, before, fs, im;

app = require("../config/express");

fs = require("fs");

im = require("imagemagick");

appDir = "" + __dirname + "/../..";

before = require("./middleware");

Image = require("../models/image");

app.get('/upload', before.login, function(req, res) {
  console.log("user: " + req.user);
  return res.render('upload', {
    title: 'Image upload'
  });
});

app.post('/webUpload', function(req, res) {
  console.log("about to upload...");
  console.log("upload: " + req.user);
  return fs.readFile(req.files.displayImage.path, function(err, data) {
    return Image.create(data, req.user, function(err, img) {
      return res.redirect('back');
    });
  });
});

app.post('/upload', function(req, res) {
  if (req.loggedIn === false) {
    return res.send({
      status: 403,
      message: "Not Logged in"
    }, 403);
  } else {
    return fs.readFile(req.files.displayImage.path, function(err, data) {
      if (err) {
        console.log(err);
        return res.send({
          status: 500,
          message: err
        }, 500);
      } else {
        return Image.create(data, req.user, function(err, img) {
          if (err) {
            console.log(err);
            return res.send({
              status: 500,
              message: err
            }, 500);
          } else {
            return res.send(JSON.stringify({
              status: 200,
              imageId: img._id,
              imageUrl: img.url("100x100")
            }));
          }
        });
      }
    });
  }
});
