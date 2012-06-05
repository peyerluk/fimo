var Image, appDir, assert, test, vows, _;

test = require("../setup");

vows = test.vows;

assert = test.assert;

_ = test._;

appDir = __dirname + "/../../..";

Image = require("../../models/image");

vows.describe("image model").addBatch({
  "new image": {
    topic: function() {
      return new Image({
        url: {
          original: "http://test.org/original.jpg"
        }
      });
    },
    "should have a url": function(image) {
      return assert.equal(image.url.original, "http://test.org/original.jpg");
    },
    "-> save": {
      topic: test.async(function(image) {
        var callback;
        callback = this.callback;
        return image.save(function(err) {
          return callback(err, image);
        });
      }),
      "should get saved": function(err, image) {
        assert.isNull(err);
        return assert.equal(image.url.original, "http://test.org/original.jpg");
      }
    }
  },
  teardown: function() {
    return test.db.clearCollection("images");
  }
})["export"](module);
