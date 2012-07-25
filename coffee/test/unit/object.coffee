test = require("../setup")
vows = test.vows
assert = test.assert 
_ = test._
appDir = __dirname + "/../../.."
User = require("../../models/user")
Item = require("../../models/object")
Comment = require("../../models/comment")
Image = require("../../models/image")
helper = require("../helper")
    
vows.describe("object model").addBatch({
  
  "new user": {
    topic: ->
      cb = @callback
      user = new User { email: "kunigunde@upfront.io" }
      user.save (err) ->
        cb err, user
    "should have an email address": (error, user) ->
      assert.isNull error
      assert.equal user.email, "kunigunde@upfront.io"
    
    "-> new image": {
      topic: (user) ->
        cb = @callback
        img = new Image({})
        img.save (err) ->
          cb err, img, user
          
      "should have saved the image": (error, img, user) ->
        assert.isNull error
    
      "--> create an object": {
        topic: (user, img) ->
          cb = @callback
          item = new Item { owner: user, image: img, tags: ["velo", "blau"], verbs: ["give"], coords: { lon: 8.533332999999999, lat: 47.383333 } }
          item.save (err) ->
            cb err, item, user, img
            
        "should have created the item for the correct owner and the correct image": (error, item, user, img) ->
          assert.isNull error
          assert.equal item.owner, user._id
          assert.equal item.image, img._id
        
        "---> write a comment": {
          topic: test.async (item, user, img) ->
            cb = @callback
            item.comments.push { text: "A great sample comment" }
            
            item.save (err) ->
              cb err, item, user, img
        
          "should have a comment on the item": (error, item, user, img) ->
            assert.isNull error
            assert.equal item.comments.length, 1
            assert.isNotNull item.comments[0].created
        
          "----> search from a close location": {
            # TODO: a function item does not work here to pass on params 
            # topic: (item, user, img) ->
            #             test.async ->
            #               Item.find { coords : { $near : [8.7, 47], $maxDistance : 0.5 } }, helper.curry @callback, user
            topic: test.async ->
             Item.find { coords : { $near : [8.7, 47], $maxDistance : 0.5 } }, @callback


            "should find our item": (error, items) ->
             #console.log user
             #console.log objects
             assert.isNull error 
             assert.equal items.length, 1 
                   
          }
        }
      }
    }
  },
  
  teardown: ->
    test.db.clearCollection "users"
    test.db.clearCollection "images"
    test.db.clearCollection "items"
  
}).export(module)