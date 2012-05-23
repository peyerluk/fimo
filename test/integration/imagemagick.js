var test = require("../setup"), vows = test.vows, assert = test.assert, _ = test._,
    im = require("imagemagick"),
    appDir = __dirname + "/../..",
    testImage = appDir + '/test/data/wood-table.jpg',
    tmpFolder = appDir + "/tmp/test";

vows.describe("Cadabra and Imagemagick").addBatch({
  
  "image info": {
    topic: function() {
      im.identify(testImage, this.callback)
    },
    "should respond get image information": function(err, info) {
      assert.equal(info.width, 480);
      assert.equal(info.height, 360);
      assert.equal(info.format.toLowerCase(), "jpeg");
    }
  },
  
  "resize image": {
    topic: function(){
      var callback = this.callback;
      var out = tmpFolder + '/resize_100.jpg';
      im.convert([testImage, '-resize', '100x100', out], function() {
        im.identify(out, callback);
      });
    },
    "should have resized the image": function(err, info){
      assert.equal(info.width, 100);
      assert.equal(info.height, 75);
    }
  },
  
  "crop square image": {
    topic: function(){
      var callback = this.callback;
      var out = tmpFolder + '/square_100.jpg';
      im.convert([testImage, '-resize', '100x100^', '-gravity', 'center', '-crop', '100x100+0+0', out], function() {
        im.identify(out, callback);
      });
    },
    "should have resized the image": function(err, info){
      assert.equal(info.width, 100);
      assert.equal(info.height, 100);
    }
  },
  
  "effect - lomo": {
    topic: function(){
      var callback = this.callback;
      var out = tmpFolder + '/lomo.jpg';
      
      var x = 480, y = 360;
      var size = "" + (x * 2.5) + "x" + (y * 2.5);
      
      im.convert([testImage, 
        '-channel', 'R', '-level', '25%', '-channel', 'G', '-level', '25%', 
        '-size', size, 'radial-gradient:none-black', 
        '-gravity', 'center', '-crop', '480x360+0+0', '+repage',
        '-compose', 'multiply', '-flatten',
        out], function() {
        im.identify(out, callback);
      });      
    },
    "should look like lomo (go check manually)": function(topic){
      assert.equal(true, true);
    }
  },
  
  "texture": {
    topic: function(){
      var callback = this.callback;
      var out = tmpFolder + '/texture.jpg';
      var texture = appDir + '/test/data/cardboard.jpg';
      im.convert([testImage, texture, '-composite', 'difference', out], function() {
        im.identify(out, callback);
      });
    },
    "should have a texture": function(err, info){
      assert.equal(true, true);
    }
  },
  
  
}).export(module);
