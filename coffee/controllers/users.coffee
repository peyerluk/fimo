app = require("../config/express")
appDir = "#{ __dirname }/../.."
before = require("./middleware")
User = require("../models/user")

app.get '/users/profile', (req, res) ->
    
    #console.log(req.user)
    
    if req.loggedIn
      res.send({
        title: 'Profile',
        status: 200,
        user: req.user,
        username: "Logged in"
      })
    else
      res.send({
        title: 'Profile',
        status: 200,
        username: "You might not be logged in, but I don't know."
      })