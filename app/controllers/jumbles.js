var Image, Jumble, Object, app, appDir, before, _;

app = require("../config/express");

appDir = "" + __dirname + "/../..";

before = require("./middleware");

Object = require("../models/object");

Image = require("../models/image");

Jumble = require("../models/jumble");

_ = require('underscore')._;

app.get('/jumbles', function(req, res) {
  return Jumble.where().desc("created").limit(10).populate('primaryObject').run(function(err, jumbles) {
    var jumble, jumbleData;
    jumbleData = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = jumbles.length; _i < _len; _i++) {
        jumble = jumbles[_i];
        _results.push({
          imageUrl: Image.url(jumble.primaryObject.image, "300x"),
          name: jumble.name,
          tags: jumble.tags,
          id: jumble._id
        });
      }
      return _results;
    })();
    return res.send({
      title: 'Jumbles nearby',
      jumbles: jumbleData,
      status: 200
    });
  });
});

app.post('/jumbles/create', function(req, res) {
  if (req.loggedIn === false) {
    return res.send({
      status: 403
    });
  } else {
    return Image.findById(req.body['primaryObject']['imageId'], function(err, image) {
      var jumble, options, primaryObject;
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
        _.extend(options['primaryObject'], {
          image: image
        });
        _.extend(options['primaryObject'], {
          owner: req.user._id
        });
        primaryObject = new Object(req.body['primaryObject']);
        options['primaryObject'] = primaryObject._id;
        jumble = new Jumble(options);
        return jumble.save(function(err) {
          if (err) {
            console.log(err);
            return res.send({
              status: 500,
              error: err
            }, 500);
          } else {
            primaryObject.jumble = jumble;
            return primaryObject.save(function(err) {
              if (err) {
                console.log(err);
                return res.send({
                  status: 500,
                  error: err
                }, 500);
              } else {
                return res.send({
                  status: 200
                });
              }
            });
          }
        });
      }
    });
  }
});
