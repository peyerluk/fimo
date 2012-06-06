test = require("../setup")
vows = test.vows
assert = test.assert
_ = test._
fs = require("fs")
appDir = __dirname + "/../../.."
Image = require("../../models/image")
User = require("../../models/user")
    
vows.describe("image model").addBatch({ 
  
  "new image": 
    topic: -> 
      new Image({})
      
    "should have a url": (image) ->
      assert.isDefined(image.id)
    
    "-> save": 
      topic: test.async (image) ->
        image.save (err) =>
          @callback(err, image)
        
      # "should get saved": (err, image) ->
      #   assert.isNull(err)
      #   assert.equal(image.url.original, "http://test.org/original.jpg")
    
  
  
  # "-> creates image":
  #   topic: test.async ->
  #     user = new User({ login: "deShawn@upfront.io" })
  #     fs.readFile "#{ __dirname }/../data/wood-table.jpg", (err, data) =>
  #       Image.create data, user, (err, img) =>
  #         @callback(err, img)
  #         
  #   "should have created tmp images": (err, img) ->
  #     assert.lengthOf(img.thumbnails, 2)
  #     assert.equal(img.thumbnails[0], "100x100")
  
  teardown: ->
    test.db.clearCollection("images")
  
}).export(module)

