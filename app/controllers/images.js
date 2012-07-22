var Image, app, appDir, before;

app = require("../config/express");

appDir = "" + __dirname + "/../..";

before = require("./middleware");

Image = require("../models/image");

app.get('/wall', function(req, res) {
  return Image.where().desc("created").limit(100).run(function(err, images) {
    var image, imageUrls;
    imageUrls = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = images.length; _i < _len; _i++) {
        image = images[_i];
        _results.push(image.url("100x100"));
      }
      return _results;
    })();
    return res.send({
      title: 'The Wall',
      images: imageUrls,
      status: 200
    });
  });
});

app.get('/image', function(req, res) {
  return Image.findById(req.query.id, function(err, image) {
    if (err) {
      return res.send({
        title: 'An Error occurred',
        error: err,
        status: 500
      });
    }
    return res.send({
      title: 'An Image',
      url: image.url("300x"),
      status: 200
    });
  });
});
