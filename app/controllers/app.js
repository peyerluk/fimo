var Image, app, appDir, before, fs, im;

app = require("../config/express");

fs = require("fs");

im = require("imagemagick");

appDir = "" + __dirname + "/../..";

before = require("./middleware");

Image = require("../models/image");

app.get('/', function(req, res) {
  console.log("welcome: " + req.user);
  return res.render('welcome', {
    title: 'Welcome to Fimo!'
  });
});

app.get('/wall', function(req, res) {
  return Image.where().desc("created").limit(100).run(function(err, images) {
    return res.render('wall', {
      title: 'The Wall',
      images: images
    });
  });
});

app.get('/upload', before.login, function(req, res) {
  console.log("user: " + req.user);
  return res.render('upload', {
    title: 'Image upload'
  });
});

app.post('/upload', function(req, res) {
  console.log("upload: " + req.user);
  return fs.readFile(req.files.displayImage.path, function(err, data) {
    return Image.create(data, req.user, function() {
      return res.redirect("back");
    });
  });
});
