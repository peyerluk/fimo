test = require("../setup")
vows = test.vows
assert = test.assert 
_ = test._
appDir = __dirname + "/../../.."
User = require("../../models/user")
    
vows.describe("user model").addBatch({ 
  
  "new user": {
    topic: ->
      new User({ email: "kunigunde@upfront.io" })
    
    "should have an email address": (user) ->
      assert.equal(user.email, "kunigunde@upfront.io")
    
    
    "-> save": {
      topic: test.async (user) ->
        callback = this.callback
        user.save( (err) ->
          callback(err, user)
        )
      
      "should save kunigunde": (err, user) ->
        assert.isNull(err)
        assert.equal(user.email, "kunigunde@upfront.io")
      
    }
  },
  
  "new located user": {
    topic: test.async ->
      callback = this.callback
      user = new User({ 
        email: "tabea-joline@upfront.io",
        coords: { lon: 8.533332999999999, lat: 47.383333 } # somewhere around Zürich
      })
      user.save( (err) ->
        callback(err, user)
      )
    
    "should save": (err, user) ->
      assert.isNull(err);
    
    
    "-> search from a close location": {
      topic: test.async ->
        User.find({ coords : { $near : [8.7, 47], $maxDistance : 0.5 } }, this.callback)
      
      "should find our user": (err, users) ->
        assert.equal(users.length, 1)
        assert.equal(users[0].email, "tabea-joline@upfront.io")
      
    },
    
    "-> search from a location far away": {
      topic: test.async ->
        User.find({ coords : { $near : [5, 42], $maxDistance : 0.5 } }, this.callback)
      
      "should not find any user": (err, users) ->
        assert.equal(users.length, 0);
      
    }
  },
  
  teardown: ->
    test.db.clearCollection("users")
  
}).export(module)