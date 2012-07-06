var Object, app, appDir, before, _;

app = require("../config/express");

appDir = "" + __dirname + "/../..";

before = require("./middleware");

Object = require("../models/object");

_ = require('underscore')._;

app.get('/newObject', function(req, res) {
  return res.send({
    title: 'New Object',
    status: 200
  });
});

app.post('/createObject', function(req, res) {
  var object, options;
  if (req.loggedIn === false) {
    return res.send({
      status: 403
    });
  } else {
    options = {};
    _.extend(options, req.body);
    _.extend(options, {
      owner: req.user._id
    });
    object = new Object(options);
    return object.save(function(err) {
      if (err) {
        return res.send({
          status: 500,
          error: err
        });
      } else {
        return res.send({
          status: 200,
          object: object
        });
      }
    });
  }
});
