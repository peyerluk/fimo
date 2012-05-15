process.env.NODE_ENV = "test";

var vows = require("vows"),
    assert = require("assert"),
    _ = require('underscore')._;


exports.vows = vows;
exports.assert = assert;
exports._ = _;
