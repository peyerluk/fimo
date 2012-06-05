app = require("../config/express")
fs = require("fs")
im = require("imagemagick")
appDir = "#{ __dirname }/../.."


app.get '/', (req, res) ->
  res.render('welcome', { 
    title: 'Welcome to Fimo!'
  })


app.post '/', (req, res) ->
  
  fs.readFile req.files.displayImage.path, (err, data) ->
    fileName = req.files.displayImage.name
    newPath = "#{ appDir }/tmp/ #{ fileName }"
    
    fs.writeFile newPath, data, (err) ->  
      cadabra.Image.open newPath, (err, image) ->
        if (!err)
          image.resize("100x100").write(appDir + "/tmp/100_" + fileName);
          res.redirect("back");
      
    

