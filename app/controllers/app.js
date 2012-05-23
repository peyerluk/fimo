var app = require("../../config/express"),
    fs = require("fs"),
    im = require("imagemagick"),
    appDir = __dirname + "/../..";

app.get('/', function(req, res) {
  res.render('welcome', { 
    title: 'Welcome to Fimo!'
  });
});

app.post('/', function(req, res) {
  
  fs.readFile(req.files.displayImage.path, function (err, data) {

    var fileName = req.files.displayImage.name
    var newPath = appDir + "/tmp/" + fileName;
    fs.writeFile(newPath, data, function (err) {
      
      cadabra.Image.open(newPath, function(err, image) {
        if(!err) {
          image.resize("100x100").write(appDir + "/tmp/100_" + fileName);
          res.redirect("back");
        
        }
      });
      
      
    });
    

    
  });
  
})