var Image, Jumble, Object, app, appDir, before, _;

app = require("../config/express");

appDir = "" + __dirname + "/../..";

before = require("./middleware");

Object = require("../models/object");

Image = require("../models/image");

Jumble = require("../models/jumble");

_ = require('underscore')._;

app.post('/jumbles/create', function(req, res) {
  console.log(req.body);
  if (req.loggedIn === false) {
    return res.send({
      status: 403
    });
  } else {
    return Image.findById(req.body['jumbleObjectImageId'], function(err, image) {
      var jumble, options;
      if (err) {
        return res.send({
          status: 500,
          error: err
        });
      } else {
        options = {};
        _.extend(options, req.body);
        jumble = new Jumble(options);
        return jumble.save(function(err) {
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
