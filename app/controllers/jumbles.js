var Image, Item, Jumble, app, appDir, before, _;

app = require("../config/express");

appDir = "" + __dirname + "/../..";

before = require("./middleware");

Item = require("../models/object");

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
          imageUrl: Image.url(jumble.primaryObject.image, "300x300"),
          name: jumble.name,
          tags: jumble.tags,
          activities: jumble.activities,
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

app.get('/jumbles/:id/wall', function(req, res) {
  return Item.where('jumble', req.params.id).desc("created").limit(100).run(function(err, items) {
    var item, wall;
    wall = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        _results.push({
          url: Image.url(item.image, "100x100"),
          objectId: item._id,
          lastActivity: item.lastActivity
        });
      }
      return _results;
    })();
    return res.send({
      title: 'Jumble',
      objects: wall,
      status: 200
    });
  });
});

app.get('/jumbles/:id/by-users', function(req, res) {
  return Item.where('jumble', req.params.id).desc("created").limit(100).populate("owner").run(function(err, items) {
    var item, itemsByUsers, _i, _len, _name, _ref;
    itemsByUsers = {};
    for (_i = 0, _len = items.length; _i < _len; _i++) {
      item = items[_i];
      if ((_ref = byOwners[_name = item.owner.id]) == null) {
        byOwners[_name] = {
          user: item.owner,
          items: []
        };
      }
      byOwners[item.owner.id].items.push({
        url: Image.url(item.image, "45x45"),
        itemId: item._id,
        user: owner
      });
    }
    return res.send({
      title: 'Jumble',
      items: itemsByUsers,
      status: 200
    });
  });
});

app.get('/jumbles/activity/clear', function(req, res) {
  return Jumble.where().desc("created").limit(10).run(function(err, jumbles) {
    var jumble, _i, _len;
    for (_i = 0, _len = jumbles.length; _i < _len; _i++) {
      jumble = jumbles[_i];
      jumble.clearActivities();
      jumble.save();
    }
    return res.send({
      title: 'Activity cleared',
      status: 200
    });
  });
});

app.get('/jumbles/activity', function(req, res) {
  Jumble.find().desc("created").limit(10).run(function(err, jumbles) {
    var jumble, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = jumbles.length; _i < _len; _i++) {
      jumble = jumbles[_i];
      jumble.clearActivities();
      _results.push(jumble.fakeActivity());
    }
    return _results;
  });
  return res.send({
    title: 'Activity created',
    status: 200
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
        primaryObject = new Item(req.body['primaryObject']);
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
