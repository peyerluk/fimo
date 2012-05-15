var test = require("../setup"), vows = test.vows, assert = test.assert, _ = test._,
    s3 = require("../../config/s3"),
    appDir = __dirname + "/../..";

vows.describe("Amazon S3").addBatch({
  
  "post image": {
    topic: function() {
      s3.putFile(appDir + '/test/data/wood-table.jpg', '/test/wood-table.jpg', this.callback);
    },
    "should respond with ok": function(err, res) {
      assert.equal(res.statusCode, 200);
    },
    
    "-> and get it": {
      topic: function(){
        s3.getFile("/test/wood-table.jpg", this.callback)
      },
      "should do something": function(err, res){
        assert.equal(res.statusCode, 200);
      }
    },
  },
  
  "get non-existent File": {
    topic: function(){
      s3.getFile("/test/0adkfjlhr96auehkl1.jpg", this.callback)
    },
    "should do something": function(err, res){
      assert.equal(res.statusCode, 404);
    },
    "should not get complete": function(err, res){
      assert.equal(res.complete, false);
    }
  },
  
  "delete non-existing file": {
    topic: function(){
      s3.deleteFile('/test/0adkfjlhr96auehkl2.jpg', this.callback);
    },
    "should get no-content status": function(err, res){
      assert.equal(res.statusCode, 204);
    },
    "should not get complete": function(err, res){
      assert.equal(res.complete, false);
    }
  }
  
}).export(module);
