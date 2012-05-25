var test = require("../setup"), vows = test.vows, assert = test.assert, _ = test._,
    appDir = __dirname + "/../..",
    Image = require("../../app/models/image");
    
vows.describe("image model").addBatch({ 
  
  "new image": {
    topic: function(){
      return new Image({ url: { original: "http://test.org/original.jpg" }});
    },
    "should have a url": function(image){
      assert.equal(image.url.original, "http://test.org/original.jpg");
    },
    
    "-> save": {
      topic: function(image) {
        var callback = this.callback;
        image.save(function(err) {
          callback(err, image);
        });
      },
      "should get saved": function(err, image){
        assert.isNull(err);
        assert.equal(image.url.original, "http://test.org/original.jpg");
      }
    }
  },
  
  teardown: function() {
    test.db.clearCollection("images");
  }
  
}).export(module);
