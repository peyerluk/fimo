test = require("../setup")
vows = test.vows
assert = test.assert 
_ = test._
appDir = __dirname + "/../../.."
User = require("../../models/user")
Object = require("../../models/object")
Jumble = require("../../models/jumble")
Image = require("../../models/image")
helper = require("../helper")
    
vows.describe("jumble model").addBatch({
  
  "stubs": {
    topic: ->
      user = new User { email: "kunigunde@upfront.io" }
      user.save (err) =>
        img = new Image({})
        img.save (err) =>
          object = new Object { owner: user, image: img, tags: ["velo", "blau"], verbs: ["give"], coords: { lon: 8.533332999999999, lat: 47.383333 }}
          object.save (err) =>
            @callback err, object, user
  
    "should have created a user and an object": (error, object, user) ->
      assert.isNull error
      assert.equal user.email, "kunigunde@upfront.io"
      assert.equal object.owner, user._id
      
    "-> create a jumble": {
      topic: (object, user) ->
        jumble = new Jumble { owner: user, primaryObject: object, name: "Philipp's coole Veloecke", coords: { lon: 8.533332999999999, lat: 47.383333 } }
        jumble.save (err) =>
          @callback err, jumble, object, user
          
      "should have a valid jumble owner": (error, jumble, object, user) ->
        assert.isNull error
        assert.equal jumble.owner, user._id
          
      "should have a valid primary object": (error, jumble, object, user) ->
        assert.equal jumble.primaryObject, object._id    
        
      "--> search from a close location": {
        topic: test.async ->
          Jumble.find { coords : { $near : [8.7, 47], $maxDistance : 0.5 } }, @callback
        
        "should find our object": (error, jumbles) ->
          assert.isNull error 
          assert.equal jumbles.length, 1
      }
    }
  },
  
  teardown: ->
    test.db.clearCollection "users"
    test.db.clearCollection "images"
    test.db.clearCollection "items"
    test.db.clearCollection "jumbles"
  
  
}).export(module);