process.env.NODE_ENV = "test";

vows = require("vows")
assert = require("assert")
mongoose = require("../config/mongodb")
_ = require('underscore')._

if ( mongoose.connection.db.databaseName != "fimo_test" )
  throw new Error('ABORTING: not connected to the test database!')
    
exports.vows = vows
exports.assert = assert
exports._ = _

exports.async = (test) ->
  if typeof test == "function"
    ->
      args = Array.prototype.slice.call(arguments, 0) # not sure if this line is necessary
      test.apply(this, args)
      undefined
  else
    undefined
    

exports.db = {
  clearCollection: (collectionName) ->
    mongoose.connection.db.collection(collectionName, (err, collection) ->
      collection.remove();
    )
}