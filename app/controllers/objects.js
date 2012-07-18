var Image, Object, app, appDir, before, _;

app = require("../config/express");

appDir = "" + __dirname + "/../..";

before = require("./middleware");

Object = require("../models/object");

Image = require("../models/image");

_ = require('underscore')._;

app.get('/objects/:id/show', function(req, res) {
  return Object.findById(req.params.id).populate('image').exec(function(err, object) {
    if (err) {
      return res.send({
        status: 500,
        error: err
      });
    } else {
      return res.render('objects/show.jade', {
        status: 200,
        title: "Object Detail",
        object: object,
        imageUrl: object.image.url("300x")
      });
    }
  });
});

app.get('/objects/new', function(req, res) {
  return res.send({
    title: 'New Object',
    status: 200
  });
});

app.post('/objects/create', function(req, res) {
  console.log(req.body);
  if (req.loggedIn === false) {
    return res.send({
      status: 403
    });
  } else {
    return Image.findById(req.body['imageId'], function(err, image) {
      var object, options;
      if (err) {
        return res.send({
          status: 500,
          error: err
        });
      } else {
        options = {};
        _.extend(options, req.body);
        _.extend(options, {
          owner: req.user._id
        });
        _.extend(options, {
          image: image
        });
        object = new Object(options);
        return object.save(function(err) {
          if (err) {
            return res.send({
              status: 500,
              error: err
            });
          } else {
            return res.redirect('/objects/' + object._id + '/show');
          }
        });
      }
    });
  }
});