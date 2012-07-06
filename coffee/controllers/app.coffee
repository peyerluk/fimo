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


app.post '/upload', (req, res) ->
  console.log "about to upload..."
  console.log("upload: #{ req.user }")
  fs.readFile req.files.displayImage.path, (err, data) ->

    Image.create data, req.user, (err, img) ->
      res.redirect("back")

      
    

