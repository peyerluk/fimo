app = require("../config/express")
appDir = "#{ __dirname }/../.."
before = require("./middleware")
Object = require("../models/object")
Image = require("../models/image")
_ = require('underscore')._
      
app.get '/objects/:id/show', (req, res) ->
  Object.findById(req.params.id).populate('image').populate('owner').exec (err, object) ->
    if err
      res.send { status: 500, error: err } 
    else
      res.send
        title: ""
        verbs: object.verbs
        tags: object.tags
        user: object.owner
        imageUrl: object.image.url("300x")

app.get '/objects/new', (req, res) ->
  res.send(
    title: 'New Object',
    status: 200
  )
  
app.post '/objects/create', (req, res) ->
  console.log(req.body)
  if ( req.loggedIn == false )
    res.send { status: 403 }
  else
    Image.findById req.body['imageId'], (err, image) ->
      if err
        return res.send { status: 500, error: err }
      else 
        options = {}
        _.extend options, req.body
        _.extend options, { owner: req.user._id }
        _.extend options, { image: image }
        object = new Object( options )
        object.save (err) ->
          if err
            return res.send { status: 500, error: err }
          else
            return res.redirect('/objects/' + object._id + '/show')