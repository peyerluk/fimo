var app = require("../../config/express");

app.get('/', function(req, res) {
  res.render('welcome', { 
    title: 'Welcome to Fimo!'
  });
});
