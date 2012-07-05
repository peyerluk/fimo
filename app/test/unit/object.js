var Image, Object, User, appDir, assert, helper, test, vows, _;

test = require("../setup");

vows = test.vows;

assert = test.assert;

_ = test._;

appDir = __dirname + "/../../..";

User = require("../../models/user");

Object = require("../../models/object");

Image = require("../../models/image");

helper = require("../helper");

vows.describe("object model").addBatch({
  "new user": {
    topic: function() {
      var cb, user;
      cb = this.callback;
      user = new User({
        email: "kunigunde@upfront.io"
      });
      return user.save(function(err) {
        return cb(err, user);
      });
    },
    "should have an email address": function(error, user) {
      assert.isNull(error);
      return assert.equal(user.email, "kunigunde@upfront.io");
    },
    "-> new image": {
      topic: function(user) {
        var cb, img;
        cb = this.callback;
        img = new Image({});
        return img.save(function(err) {
          return cb(err, img, user);
        });
      },
      "should have saved the image": function(error, img, user) {
        return assert.isNull(error);
      },
      "--> create an object": {
        topic: function(user, img) {
          var cb, object;
          cb = this.callback;
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
            return cb(err, object, user, img);
          });
        },
        "should have created the object for the correct owner and the correct image": function(error, object, user, img) {
          assert.isNull(error);
          assert.equal(object.owner, user._id);
          return assert.equal(object.image, img._id);
        },
        "---> search from a close location": {
          topic: test.async(function() {
            return Object.find({
              coords: {
                $near: [8.7, 47],
                $maxDistance: 0.5
              }
            }, this.callback);
          }),
          "should find our object": function(error, objects) {
            assert.isNull(error);
            return assert.equal(objects.length, 1);
          }
        }
      }
    }
  },
  teardown: function() {
    test.db.clearCollection("users");
    test.db.clearCollection("images");
    return test.db.clearCollection("objects");
  }
})["export"](module);
