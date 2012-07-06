app = require("../config/express")
fs = require("fs")
im = require("imagemagick")
appDir = "#{ __dirname }/../.."
before = require("./middleware")
Image = require("../models/image")


# ROUTES

# app.get '/', (req, res) ->
#   console.log("welcome: #{ req.user }")
#   res.render('welcome', { 
#     title: 'Welcome to Fimo!'
#   })
  
# app.get '/wall', (req, res) ->
#   Image.where().desc("created").limit(100).run (err, images) ->
#     res.render('wall', { 
#       title: 'The Wall',
#       images: images
#     })
  
app.get '/upload', before.login, (req, res) ->
  console.log("user: #{ req.user }")
  
  res.render('upload', { 
    title: 'Image upload'
  })


app.post '/webUpload', (req, res) ->
  console.log "about to upload..."
  console.log("upload: #{ req.user }")
  fs.readFile req.files.displayImage.path, (err, data) ->
    Image.create data, req.user, (err, img) ->
      res.redirect('back')

app.post '/upload', (req, res) ->      
  if ( req.loggedIn == false )
    res.send { status: 403 }
  else
    fs.readFile req.files.displayImage.path, (err, data) ->
      if err
        console.log(err)
        res.send( { status: 500, error: err } )
      else
        Image.create data, req.user, (err, img) ->
          if err
            console.log(err)
            res.send( { status: 500, error: err } )
          else
            res.send( JSON.stringify { status: 200, imageId: img._id, imageUrl: img.url("100x100") } )

