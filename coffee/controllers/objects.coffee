app = require("../config/express")
appDir = "#{ __dirname }/../.."
before = require("./middleware")
Object = require("../models/object")
_ = require('underscore')._

app.get '/newObject', (req, res) ->
  res.send({
    title: 'New Object',
    status: 200
  })
  
app.post '/createObject', (req, res) ->
  if ( req.loggedIn == false )
    res.send { status: 403 }
  else
    options = {}
    _.extend options, req.body
    _.extend options, { owner: req.user._id }
    object = new Object( options )
    object.save (err) ->
      if err
        res.send { status: 500, error: err }
      else
        res.send( { status: 200, object: object } )