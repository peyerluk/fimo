process.env.NODE_ENV = "test";

var vows = require("vows"),
    assert = require("assert"),
    mongoose = require("../config/mongodb"),
    _ = require('underscore')._;

if( mongoose.connection.db.databaseName !== "fimo_test" ) {
  throw new Error('ABORTING: not connected to the test database!')
}
    
exports.vows = vows;
exports.assert = assert;
exports._ = _;

exports.db = {
  clearCollection: function(collectionName) {
    mongoose.connection.db.collection(collectionName, function(err, collection) {
      collection.remove();
    });
  }
}