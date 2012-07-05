test = require("../setup")
vows = test.vows
assert = test.assert 
_ = test._
appDir = __dirname + "/../../.."
User = require("../../models/user")
Object = require("../../models/object")
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
          object = new Object { owner: user, image: img, tags: ["velo", "blau"], verbs: ["give"], coords: { lon: 8.533332999999999, lat: 47.383333 } }
          object.save (err) ->
            cb err, object, user, img
        "should have created the object for the correct owner and the correct image": (error, object, user, img) ->
          assert.isNull error
          assert.equal object.owner, user._id
          assert.equal object.image, img._id
        
        "---> search from a close location": {
          # TODO: a function object does not work here to pass on params 
          # topic: (object, user, img) ->
          #             test.async ->
          #               Object.find { coords : { $near : [8.7, 47], $maxDistance : 0.5 } }, helper.curry @callback, user
          topic: test.async ->
            Object.find { coords : { $near : [8.7, 47], $maxDistance : 0.5 } }, @callback
          
            
          "should find our object": (error, objects) ->
            #console.log user
            #console.log objects
            assert.isNull error 
            assert.equal objects.length, 1
        
        }
      }
    }
  },
  
  teardown: ->
    test.db.clearCollection "users"
    test.db.clearCollection "images"
    test.db.clearCollection "objects"
  
}).export(module)