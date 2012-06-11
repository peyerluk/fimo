var Image, User, appDir, assert, fs, test, vows, _;

test = require("../setup");

vows = test.vows;

assert = test.assert;

_ = test._;

fs = require("fs");

appDir = __dirname + "/../../..";

Image = require("../../models/image");

User = require("../../models/user");

vows.describe("image model").addBatch({
  "new image": {
    topic: function() {
      return new Image({});
    },
    "should have a url": function(image) {
      return assert.isDefined(image.id);
    },
    "-> save": {
      topic: test.async(function(image) {
        var _this = this;
        return image.save(function(err) {
          return _this.callback(err, image);
        });
      }),
      "should get saved": function(err, image) {
        assert.isNull(err);
        return assert.equal(image.url(), "http://fimo.s3.amazonaws.com/images/" + image.id + ".jpg");
      }
    }
  },
  teardown: function() {
    return test.db.clearCollection("images");
  }
})["export"](module);
