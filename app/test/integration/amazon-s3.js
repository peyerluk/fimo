var appDir, assert, s3, test, vows, _;

test = require("../setup");

vows = test.vows;

assert = test.assert;

_ = test._;

s3 = require("../../config/s3");

appDir = __dirname + "/../../..";

vows.describe("Amazon S3").addBatch({
  "post image": {
    topic: test.async(function() {
      return s3.putFile("" + __dirname + "/../data/wood-table.jpg", '/test/wood-table.jpg', this.callback);
    }),
    "should respond with ok": function(err, res) {
      return assert.equal(res.statusCode, 200);
    },
    "-> and get it": {
      topic: test.async(function() {
        return s3.getFile("/test/wood-table.jpg", this.callback);
      }),
      "should do something": function(err, res) {
        return assert.equal(res.statusCode, 200);
      }
    }
  },
  "get non-existent File": {
    topic: test.async(function() {
      return s3.getFile("/test/0adkfjlhr96auehkl1.jpg", this.callback);
    }),
    "should do something": function(err, res) {
      return assert.equal(res.statusCode, 404);
    },
    "should not get complete": function(err, res) {
      return assert.equal(res.complete, false);
    }
  },
  "delete non-existing file": {
    topic: test.async(function() {
      return s3.deleteFile('/test/0adkfjlhr96auehkl2.jpg', this.callback);
    }),
    "should get no-content status": function(err, res) {
      return assert.equal(res.statusCode, 204);
    },
    "should not get complete": function(err, res) {
      return assert.equal(res.complete, false);
    }
  }
})["export"](module);
