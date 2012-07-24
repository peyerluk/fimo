var Image, Object, app, appDir, before, _;

app = require("../config/express");

appDir = "" + __dirname + "/../..";

before = require("./middleware");

Object = require("../models/object");

Image = require("../models/image");

_ = require('underscore')._;

app.get('/wall', function(req, res) {
  return Object.where().desc("created").limit(100).populate('image').run(function(err, objects) {
    var object, objectData;
    objectData = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = objects.length; _i < _len; _i++) {
        object = objects[_i];
        _results.push({
          url: object.image.url("100x100"),
          objectId: object._id
        });
      }
      return _results;
    })();
    return res.send({
      title: 'Jumble',
      objects: objectData,
      status: 200
    });
  });
});

app.get('/objects/:id/show', function(req, res) {
  return Object.findById(req.params.id).populate('image').populate('owner').exec(function(err, object) {
    if (err) {
      return res.send({
        status: 500,
        error: err
      });
    } else {
      return res.send({
        title: "",
        verbs: object.verbs,
        tags: object.tags,
        user: object.owner,
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
