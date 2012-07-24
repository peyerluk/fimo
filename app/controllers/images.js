var Image, app, appDir, before;

app = require("../config/express");

appDir = "" + __dirname + "/../..";

before = require("./middleware");

Image = require("../models/image");

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
