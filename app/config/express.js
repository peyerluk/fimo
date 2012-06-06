var User, app, appDir, express, expressPort, lessMiddleware, mongooseAuth;

appDir = "" + __dirname + "/../..";

express = require("express");

lessMiddleware = require('less-middleware');

expressPort = process.env.PORT || 3000;

User = require('../models/user');

mongooseAuth = require('mongoose-auth');

app = express.createServer();

app.configure(function() {
  var bundle;
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static("" + appDir + "/public"));
  app.use(express.cookieParser());
  app.use(express.session({
    secret: 'I60b0ObILHStw7rx'
  }));
  app.use(mongooseAuth.middleware());
  bundle = require('browserify')("" + appDir + "/app/browser/test.js");
  app.use(bundle);
  app.use(lessMiddleware({
    src: "" + appDir + "/public",
    compress: true
  }));
  app.set('views', "" + appDir + "/app/views");
  app.set('view engine', 'jade');
  return mongooseAuth.helpExpress(app);
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

module.exports = app;
