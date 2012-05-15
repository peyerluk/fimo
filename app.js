var app = require("./config/express"),
    s3 = require("./config/s3");

app.get('/', function(request, response) {
  response.send('Hello Fimo!');
});