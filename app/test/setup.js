var assert, mongoose, vows, _;

process.env.NODE_ENV = "test";

vows = require("vows");

assert = require("assert");

mongoose = require("../config/mongodb");

_ = require('underscore')._;

if (mongoose.connection.db.databaseName !== "fimo_test") {
  throw new Error('ABORTING: not connected to the test database!');
}

exports.vows = vows;

exports.assert = assert;

exports._ = _;

exports.async = function(test) {
  if (typeof test === "function") {
    return function() {
      var args;
      args = Array.prototype.slice.call(arguments, 0);
      test.apply(this, args);
      return void 0;
    };
  } else {
    return void 0;
  }
};

exports.db = {
  clearCollection: function(collectionName) {
    return mongoose.connection.db.collection(collectionName, function(err, collection) {
      return collection.remove();
    });
  }
};
