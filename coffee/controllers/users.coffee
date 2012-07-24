app = require("../config/express")
appDir = "#{ __dirname }/../.."
before = require("./middleware")
User = require("../models/user")
Image = require("../models/image")
fs = require("fs")

app.post '/users/profilePicture', (req, res) ->
  #console.log "about to upload..."
  #console.log("upload: #{ req.user }")
  if req.loggedIn == false
    return res.send { status: 403 }, 403

  fs.readFile req.files.displayImage.path, (err, data) ->
    Image.createProfilePicture data, req.user, (err, img) ->
      if err        
        console.log err
        return res.send { status: 500 }, 500
      else         
        req.user.picture = img
        req.user.save (err) ->
          if err
            console.log err
            return res.send { status: 500 }, 500
          else
            return res.redirect('back')

app.get '/users/profile', (req, res) ->
    if req.user
      
      res.send({
        title: 'Profile',
        status: 200,
        user: req.user,
        imageUrl: Image.url(req.user.picture, "100x100")
      })
    else
      res.send({
        title: 'Profile',
        status: 404,
        message: "You might not be logged in, but I don't know."
      })