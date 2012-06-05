test = require("../setup")
vows = test.vows
assert = test.assert
_ = test._
appDir = __dirname + "/../../.."
Image = require("../../models/image")
    
vows.describe("image model").addBatch({ 
  
  "new image": {
    topic: -> 
      new Image({ url: { original: "http://test.org/original.jpg" }})
      
    "should have a url": (image) ->
      assert.equal(image.url.original, "http://test.org/original.jpg")
    
    
    "-> save": {
      topic: test.async (image) ->
        callback = this.callback
        image.save( (err) ->
          callback(err, image)
        )
      
      "should get saved": (err, image) ->
        assert.isNull(err)
        assert.equal(image.url.original, "http://test.org/original.jpg")
    }
  },
  
  teardown: ->
    test.db.clearCollection("images")
  
}).export(module)

