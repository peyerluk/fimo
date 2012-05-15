// VARIABLES
var appDir = __dirname + "/..",
    express = require("express"),
    expressPort = process.env.PORT || 3000;




// EXPRESS
var app = express.createServer();
app.configure(function () {
  
  // app.use(express.logger());
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(app.router);

  // views & assets
  app.set('views', appDir + "/app/views");
  app.set('view engine', 'jade');
  app.use(express.static(appDir + "/public"));
});

app.configure('test', function() {
  expressPort = 3011;
});

app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
  app.use(express.errorHandler());
  console.log("running in production mode");
});

// run internal server on port 3000
app.listen(expressPort);

// EXPORT
module.exports = app;