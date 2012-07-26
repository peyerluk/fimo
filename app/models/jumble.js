var Activity, Image, Item, Jumble, JumbleModel, Schema, User, mongoose;

mongoose = require("../config/mongodb");

Schema = mongoose.Schema;

User = require("./user");

Item = require("./object");

Image = require("./image");

Activity = new Schema({
  itemId: {
    type: Schema.ObjectId,
    ref: 'Item'
  },
  itemImage: {
    type: String
  },
  activity: {
    type: String
  },
  happened: {
    type: Date,
    "default": Date.now
  }
});

Jumble = new Schema({
  owner: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  primaryObject: {
    type: Schema.ObjectId,
    ref: 'Item',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  tags: {
    type: [String]
  },
  objects: {
    type: [Item]
  },
  participants: {
    type: [User]
  },
  activities: {
    type: [Activity]
  },
  coords: {
    lon: Number,
    lat: Number
  },
  created: {
    type: Date,
    "default": Date.now
  }
});

Jumble.methods.clearActivities = function() {
  var index, _i, _ref, _results;
  if (this.activities.length) {
    _results = [];
    for (index = _i = _ref = this.activities.length - 1; _ref <= 0 ? _i <= 0 : _i >= 0; index = _ref <= 0 ? ++_i : --_i) {
      _results.push(this.activities[index].remove());
    }
    return _results;
  }
};

Jumble.methods.fakeActivity = function() {
  var _this = this;
  return Item.where('jumble', this.id).desc("created").limit(100).run(function(err, items) {
    var item, random, _i, _len;
    for (_i = 0, _len = items.length; _i < _len; _i++) {
      item = items[_i];
      random = Math.random();
      item.lastActivity = random > 0.85 ? "comment" : random > 0.7 ? "like" : random > 0.55 ? "star" : null;
      if (item.lastActivity) {
        _this.activities.push({
          itemId: item.id,
          itemImage: Image.url(item.image, "100x100"),
          activity: item.lastActivity
        });
      }
      item.save();
    }
    _this.save();
    return console.log("Faked " + _this.name + ": " + _this.activities.length);
  });
};

Jumble.index({
  coords: "2d"
});

JumbleModel = mongoose.model('Jumble', Jumble);

module.exports = JumbleModel;
