app = require("../config/express")
appDir = "#{ __dirname }/../.."
before = require("./middleware")
Object = require("../models/object")
Image = require("../models/image")
Jumble = require("../models/jumble")
_ = require('underscore')._



app.post '/jumbles/create', (req, res) ->
  #console.log(req.body)
  if ( req.loggedIn == false )
    res.send { status: 403 }
  else
    Image.findById req.body['primaryObject']['imageId'], (err, image) ->
      if err
        return res.send { status: 500, error: err }
      else         
        options = {}
        _.extend options, req.body
        _.extend options, { owner: req.user._id }
        _.extend options['primaryObject'], { image: image }
        _.extend options['primaryObject'], { owner: req.user._id }
        #console.log(options['primaryObject'])
        primaryObject = new Object( req.body['primaryObject'] )
        #console.log(options)
        options['primaryObject'] = primaryObject._id
        jumble = new Jumble( options )
        jumble.save (err) ->
          if err
            console.log(err)
            return res.send { status: 500, error: err }, 500
          else    
            primaryObject.jumble = jumble
            primaryObject.save (err) ->
              if err
                console.log err
                return res.send { status: 500, error: err }, 500
              else
                return res.send { status: 200 }