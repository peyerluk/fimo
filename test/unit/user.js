var test = require("../setup"), vows = test.vows, assert = test.assert, _ = test._,
    appDir = __dirname + "/../..",
    User = require("../../app/models/user");
    
vows.describe("user model").addBatch({ 
  
  "new user": {
    topic: function() {
      return new User({ username: "lukas" });
    },
    "should have a username": function(user){
      assert.equal(user.username, "lukas");
    },
    
    "-> save": {
      topic: function(user) {
        var callback = this.callback;
        user.save(function(err) {
          callback(err, user);
        });
      },
      "should save": function(err, user){
        assert.isNull(err);
        assert.equal(user.username, "lukas");
      }
    }
  },
  
  "new located user": {
    topic: function() {
      var callback = this.callback;
      var user = new User({ 
        username: "gabriel",
        coords: { lon: 8.533332999999999, lat: 47.383333 } // somewhere around Zürich
      });
      user.save(function(err) {
        callback(err, user);
      })
    },
    "should save": function(err, user){
      assert.isNull(err);
    },
    
    "-> search from a close location": {
      topic: function(){
        User.find({ coords : { $near : [8.7, 47], $maxDistance : 0.5 } }, this.callback);
      },
      "should find our user": function(err, users){
        assert.equal(users.length, 1);
        assert.equal(users[0].username, "gabriel");
      }
    },
    
    "-> search from a location far away": {
      topic: function(){
        User.find({ coords : { $near : [5, 42], $maxDistance : 0.5 } }, this.callback);
      },
      "should not find any user": function(err, users){
        assert.equal(users.length, 0);
      }
    }
  },
  
  teardown: function() {
    test.db.clearCollection("users");
  }
  
}).export(module);

// latitude: 
// longitude: 