var app, appDir, fs, im;

app = require("../config/express");

fs = require("fs");

im = require("imagemagick");

appDir = "" + __dirname + "/../..";

app.get('/', function(req, res) {
  return res.render('welcome', {
    title: 'Welcome to Fimo!'
  });
});

app.post('/', function(req, res) {
  return fs.readFile(req.files.displayImage.path, function(err, data) {
    var fileName, newPath;
    fileName = req.files.displayImage.name;
    newPath = "" + appDir + "/tmp/ " + fileName;
    return fs.writeFile(newPath, data, function(err) {
      return cadabra.Image.open(newPath, function(err, image) {
        if (!err) {
          image.resize("100x100").write(appDir + "/tmp/100_" + fileName);
          return res.redirect("back");
        }
      });
    });
  });
});
