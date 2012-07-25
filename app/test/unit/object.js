var Comment, Image, Item, User, appDir, assert, helper, test, vows, _;

test = require("../setup");

vows = test.vows;

assert = test.assert;

_ = test._;

appDir = __dirname + "/../../..";

User = require("../../models/user");

Item = require("../../models/object");

Comment = require("../../models/comment");

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
          var cb, item;
          cb = this.callback;
          item = new Item({
            owner: user,
            image: img,
            tags: ["velo", "blau"],
            verbs: ["give"],
            coords: {
              lon: 8.533332999999999,
              lat: 47.383333
            }
          });
          return item.save(function(err) {
            return cb(err, item, user, img);
          });
        },
        "should have created the item for the correct owner and the correct image": function(error, item, user, img) {
          assert.isNull(error);
          item.comments.push({
            text: "A great sample comment"
          });
          console.log("assertion: " + item);
          assert.equal(item.owner, user._id);
          return assert.equal(item.image, img._id);
        },
        "---> write a comment": {
          topic: function(item, user, img) {
            var cb;
            cb = this.callback;
            console.log("zero " + item);
            item.comments[0] = {
              text: "A great sample comment"
            };
            console.log("first " + item);
            item.save(function(err) {
              console.log("third " + err);
              return cb(err, item, user, img);
            });
            return void 0;
          },
          "should have a comment on the item": function(error, item, user, img) {
            console.log("HEEERREEE");
            console.log("second " + item);
            assert.isNull(error);
            return {
              "----> search from a close location": {
                topic: test.async(function() {
                  return Item.find({
                    coords: {
                      $near: [8.7, 47],
                      $maxDistance: 0.5
                    }
                  }, this.callback);
                }),
                "should find our item": function(error, items) {
                  assert.isNull(error);
                  return assert.equal(items.length, 1);
                }
              }
            };
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
