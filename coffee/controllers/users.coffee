app = require("../config/express")
appDir = "#{ __dirname }/../.."
before = require("./middleware")
User = require("../models/user")

app.get '/profile', (req, res) ->
    
    res.send({
      title: 'Profile',
      status: 200,
      username: "Not logged in"
    })