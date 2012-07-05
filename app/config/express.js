var User, app, appDir, dev, express, expressPort, fs, iface, ifaces, key, lessMiddleware, mongooseAuth, os, _, _i, _len;

appDir = "" + __dirname + "/../..";

express = require("express");

_ = require("underscore");

lessMiddleware = require('less-middleware');

expressPort = process.env.PORT || 3000;

User = require('../models/user');

mongooseAuth = require('mongoose-auth');

os = require('os');

fs = require('fs');

ifaces = os.networkInterfaces();

app = express.createServer();

app.configure('development', function() {
  return app.use(function(req, res, next) {
    var headers;
    headers = {
      'Cache-Control': 'max-age:120'
    };
    if (!_.isUndefined(req.headers.origin)) {
      headers = _.extend(headers, {
        'Access-Control-Allow-Origin': req.headers.origin,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With, X-PINGOTHER',
        'Access-Control-Max-Age': 86400
      });
    }
    _.each(headers, function(value, key) {
      return res.setHeader(key, value);
    });
    return next();
  });
});

app.configure(function() {
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: 'I60b0ObILHStw7rx'
  }));
  app.use(mongooseAuth.middleware());
  app.use(express["static"]("" + appDir + "/public"));
  app.set('views', "" + appDir + "/app/views");
  app.set('view engine', 'jade');
  mongooseAuth.helpExpress(app);
  return app.enable("jsonp callback");
});

app.configure('test', function() {
  return expressPort = 3011;
});

app.configure('development', function() {
  return app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

app.configure('production', function() {
  app.use(express.errorHandler());
  return console.log("running in production mode");
});

app.listen(expressPort);

for (key in ifaces) {
  iface = ifaces[key];
  for (_i = 0, _len = iface.length; _i < _len; _i++) {
    dev = iface[_i];
    if (dev.family && dev.family === 'IPv4') {
      if (dev.address.split(".")[0] !== '127') {
        fs.writeFileSync("public/coffee/hostname.coffee", "@fimo.hostname = 'http://" + dev.address + ":3000'");
        console.log("rewriting dev server address to: " + dev.address);
      }
    }
  }
}

module.exports = app;
