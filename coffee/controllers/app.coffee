app = require("../config/express")
fs = require("fs")
im = require("imagemagick")
appDir = "#{ __dirname }/../.."
before = require("./middleware")
Image = require("../models/image")


# ROUTES
  
app.get '/upload', before.login, (req, res) ->
  console.log("user: #{ req.user }")
  
  res.render('upload', { 
    title: 'Image upload'
  })


app.post '/upload', (req, res) ->      
  if ( req.loggedIn == false )
    #console.log "not allowed"
    res.send { status: 403, message: "Not Logged in" }, 403
  else
    #console.log "uploading..."
    fs.readFile req.files.displayImage.path, (err, data) ->
      if err
        console.log(err)
        res.send( { status: 500, message: err }, 500 )
      else
        Image.create data, req.user, (err, img) ->
          if err
            console.log(err)
            res.send( { status: 500, message: err }, 500 )
          else
            console.log img
            res.send( JSON.stringify({ status: 200, imageId: img._id, imageUrl: img.url("100x100") }) )

