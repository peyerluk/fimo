// VARIABLES
var application_root = __dirname + "/..",
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
  app.set('views', application_root + "/app/views");
  app.set('view engine', 'jade');
  app.use(express.static(application_root + "/public"));
});

app.configure('test', function() {
  expressPort = 3011;
});

app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
  app.use(express.errorHandler());
  console.log("prod");
});

// run internal server on port 3000
app.listen(expressPort);

// EXPORT
module.exports = app;