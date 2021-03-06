app = require("../config/express")
appDir = "#{ __dirname }/../.."
before = require("./middleware")
Object = require("../models/object")
Image = require("../models/image")
Jumble = require("../models/jumble")
_ = require('underscore')._
            
app.get '/objects/:id/show', (req, res) ->
  Object.findById(req.params.id).populate('owner').populate('jumble').exec (err, object) ->
    if err
      res.send { status: 500, error: err } 
    else
      res.send
        title: ""
        verbs: object.verbs
        tags: object.tags
        user: object.owner
        userImage: Image.url(object.owner.picture, "45x45")
        jumbleName: object.jumble.name
        imageUrl: Image.url(object.image, "300x300")
        comments: object.getComments()

app.get '/objects/new', (req, res) ->
  res.send(
    title: 'New Object',
    status: 200
  )
  
app.post '/objects/create', (req, res) ->
  #console.log(req.body)
  if ( req.loggedIn == false )
    res.send { status: 403 }
  else
    Image.findById req.body['imageId'], (err, image) ->
      if err
        console.log "image error " + err
        return res.send { status: 500, error: err }
      else 
        options = {}
        _.extend options, req.body
        _.extend options, { owner: req.user._id }
        _.extend options, { image: image }
        object = new Object( options )
        object.save (err) ->
          if err
            console.log "object error " + err
            return res.send { status: 500, error: err }
          else
            return res.send {
              jumbleId: object.jumble
              objectId: object._id
            }          
      
app.post "/objects/:id/comment", (req, res) ->
  #console.log "RECEIVING COMMENT..."
  #console.log req.body
  if ( req.loggedIn == false )
    res.send { status: 403 }
  else
    Object.findById(req.params.id).populate('jumble').exec (err, object) ->
      if err
        console.log "object find error " + err
        return res.send { status : 500, error : err }
      else if object == null
        return res.send { status : 500, error: "item not found" }
      else
        object.comments.push { jumble : req.body['jumbleId'], user : req.user._id, userImage : req.user.picture, username : req.user.username, text : req.body['text'] }
        object.lastActivity = "comment"
        object.save (err) ->
          if err
            console.log "obejct save error " + err
            return res.send { status : 500, error : err }
          else
            query = { _id: object.jumble };
            newActivities = object.jumble.activities
            newActivities[0] = { itemId: object._id, itemImage: Image.url(object.image, "100x100"), activity: object.lastActivity }
            Jumble.update query, { activities: newActivities }, undefined, (err) ->
              console.log err if err
              console.log "created comment"
              # comments = for comment in object.comments
              #   { text : comment.text, userImageUrl : Image.url(comment.userImage, "30x30") }
              return res.send { status : 200, comments: object.getComments() }
