var Image, Jumble, Object, User, appDir, assert, helper, test, vows, _;

test = require("../setup");

vows = test.vows;

assert = test.assert;

_ = test._;

appDir = __dirname + "/../../..";

User = require("../../models/user");

Object = require("../../models/object");

Jumble = require("../../models/jumble");

Image = require("../../models/image");

helper = require("../helper");

vows.describe("jumble model").addBatch({
  "stubs": {
    topic: function() {
      var user,
        _this = this;
      user = new User({
        email: "kunigunde@upfront.io"
      });
      return user.save(function(err) {
        var img;
        img = new Image({});
        return img.save(function(err) {
          var object;
          object = new Object({
            owner: user,
            image: img,
            tags: ["velo", "blau"],
            verbs: ["give"],
            coords: {
              lon: 8.533332999999999,
              lat: 47.383333
            }
          });
          return object.save(function(err) {
            return _this.callback(err, object, user);
          });
        });
      });
    },
    "should have created a user and an object": function(error, object, user) {
      assert.isNull(error);
      assert.equal(user.email, "kunigunde@upfront.io");
      return assert.equal(object.owner, user._id);
    },
    "-> create a jumble": {
      topic: function(object, user) {
        var jumble,
          _this = this;
        jumble = new Jumble({
          owner: user,
          primaryObject: object,
          name: "Philipp's coole Veloecke",
          coords: {
            lon: 8.533332999999999,
            lat: 47.383333
          }
        });
        return jumble.save(function(err) {
          return _this.callback(err, jumble, object, user);
        });
      },
      "should have a valid jumble owner": function(error, jumble, object, user) {
        assert.isNull(error);
        return assert.equal(jumble.owner, user._id);
      },
      "should have a valid primary object": function(error, jumble, object, user) {
        return assert.equal(jumble.primaryObject, object._id);
      },
      "--> search from a close location": {
        topic: test.async(function() {
          return Jumble.find({
            coords: {
              $near: [8.7, 47],
              $maxDistance: 0.5
            }
          }, this.callback);
        }),
        "should find our object": function(error, jumbles) {
          assert.isNull(error);
          return assert.equal(jumbles.length, 1);
        }
      }
    }
  },
  teardown: function() {
    test.db.clearCollection("users");
    test.db.clearCollection("images");
    test.db.clearCollection("items");
    return test.db.clearCollection("jumbles");
  }
})["export"](module);
