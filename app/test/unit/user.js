var User, appDir, assert, test, vows, _;

test = require("../setup");

vows = test.vows;

assert = test.assert;

_ = test._;

appDir = __dirname + "/../../..";

User = require("../../models/user");

vows.describe("user model").addBatch({
  "new user": {
    topic: function() {
      return new User({
        email: "kunigunde@upfront.io"
      });
    },
    "should have an email address": function(user) {
      return assert.equal(user.email, "kunigunde@upfront.io");
    },
    "-> save": {
      topic: test.async(function(user) {
        var callback;
        callback = this.callback;
        return user.save(function(err) {
          return callback(err, user);
        });
      }),
      "should save kunigunde": function(err, user) {
        assert.isNull(err);
        return assert.equal(user.email, "kunigunde@upfront.io");
      }
    }
  },
  "new located user": {
    topic: test.async(function() {
      var callback, user;
      callback = this.callback;
      user = new User({
        email: "tabea-joline@upfront.io",
        coords: {
          lon: 8.533332999999999,
          lat: 47.383333
        }
      });
      return user.save(function(err) {
        return callback(err, user);
      });
    }),
    "should save": function(err, user) {
      return assert.isNull(err);
    },
    "-> search from a close location": {
      topic: test.async(function() {
        return User.find({
          coords: {
            $near: [8.7, 47],
            $maxDistance: 0.5
          }
        }, this.callback);
      }),
      "should find our user": function(err, users) {
        assert.equal(users.length, 1);
        return assert.equal(users[0].email, "tabea-joline@upfront.io");
      }
    },
    "-> search from a location far away": {
      topic: test.async(function() {
        return User.find({
          coords: {
            $near: [5, 42],
            $maxDistance: 0.5
          }
        }, this.callback);
      }),
      "should not find any user": function(err, users) {
        return assert.equal(users.length, 0);
      }
    }
  },
  teardown: function() {
    return test.db.clearCollection("users");
  }
})["export"](module);
