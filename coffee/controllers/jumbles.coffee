app = require("../config/express")
appDir = "#{ __dirname }/../.."
before = require("./middleware")
Object = require("../models/object")
Image = require("../models/image")
Jumble = require("../models/jumble")
_ = require('underscore')._



app.post '/jumbles/create', (req, res) ->
  console.log(req.body)
  if ( req.loggedIn == false )
    res.send { status: 403 }
  else
    Image.findById req.body['jumbleObjectImageId'], (err, image) ->
      if err
        return res.send { status: 500, error: err }
      else 
        options = {}
        _.extend options, req.body
        jumble = new Jumble( options )  # create primary object
        jumble.save (err) ->
          if err
            return res.send { status: 500, error: err }
          else
            return res.redirect('/objects/' + object._id + '/show')