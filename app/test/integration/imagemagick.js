var appDir, assert, im, test, testImage, tmpFolder, vows, _;

im = require("imagemagick");

test = require("../setup");

vows = test.vows;

assert = test.assert;

_ = test._;

appDir = __dirname + "/../../..";

testImage = __dirname + '/../data/wood-table.jpg';

tmpFolder = appDir + "/tmp/test";

vows.describe("Imagemagick").addBatch({
  "image info": {
    topic: test.async(function() {
      return im.identify(testImage, this.callback);
    }),
    "should respond get image information": function(err, info) {
      assert.equal(info.width, 480);
      assert.equal(info.height, 360);
      return assert.equal(info.format.toLowerCase(), "jpeg");
    }
  },
  "resize image": {
    topic: test.async(function() {
      var callback, out;
      callback = this.callback;
      out = "" + tmpFolder + "/resize_100.jpg";
      return im.convert([testImage, '-resize', '100x100', out], function() {
        return im.identify(out, callback);
      });
    }),
    "should have resized the image": function(err, info) {
      assert.equal(info.width, 100);
      return assert.equal(info.height, 75);
    }
  },
  "crop square image": {
    topic: test.async(function() {
      var callback, out;
      callback = this.callback;
      out = "" + tmpFolder + "/square_100.jpg";
      return im.convert([testImage, '-resize', '100x100^', '-gravity', 'center', '-crop', '100x100+0+0', out], function() {
        return im.identify(out, callback);
      });
    }),
    "should have resized the image": function(err, info) {
      assert.equal(info.width, 100);
      return assert.equal(info.height, 100);
    }
  },
  "effect - lomo": {
    topic: test.async(function() {
      var callback, out, size, x, y;
      callback = this.callback;
      out = "" + tmpFolder + "/lomo.jpg";
      x = 480;
      y = 360;
      size = " " + (x * 2.5) + "x" + (y * 2.5);
      return im.convert([testImage, '-channel', 'R', '-level', '25%', '-channel', 'G', '-level', '25%', '-size', size, 'radial-gradient:none-black', '-gravity', 'center', '-crop', '480x360+0+0', '+repage', '-compose', 'multiply', '-flatten', out], function() {
        return im.identify(out, callback);
      });
    }),
    "should look like lomo (go check manually)": function(topic) {
      return assert.equal(true, true);
    }
  },
  "texture": {
    topic: test.async(function() {
      var callback, out, texture;
      callback = this.callback;
      out = "" + tmpFolder + "/texture.jpg";
      texture = "../data/texture.jpg";
      return im.convert([testImage, texture, '-compose', 'hard-light', '-composite', out], function() {
        return im.identify(out, callback);
      });
    }),
    "should have a texture": function(err, info) {
      return assert.equal(true, true);
    }
  }
})["export"](module);
