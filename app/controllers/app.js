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

app.post('/upload', function(req, res) {
  console.log("about to upload...");
  console.log("upload: " + req.user);
  return fs.readFile(req.files.displayImage.path, function(err, data) {
    return Image.create(data, req.user, function(err, img) {
      return res.redirect("back");
    });
  });
});
