var app = require("./config/express");

app.get('/', function(request, response) {
  response.send('Hello Fimo!');
});