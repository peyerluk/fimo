app = require("../config/express")
appDir = "#{ __dirname }/../.."
before = require("./middleware")
Item = require("../models/object")
Image = require("../models/image")
Jumble = require("../models/jumble")
_ = require('underscore')._

  
app.get '/jumbles', (req, res) ->
  Jumble.where().desc("created").limit(10).populate('primaryObject').run (err, jumbles) ->
    
    jumbleData = for jumble in jumbles
      { 
        imageUrl: Image.url(jumble.primaryObject.image, "300x300")
        name: jumble.name
        tags: jumble.tags
        activities: jumble.activities
        id: jumble._id 
      }
    
    res.send
      title: 'Jumbles nearby',
      jumbles: jumbleData,
      status: 200
      

app.get '/jumbles/:id/wall', (req, res) ->
  Item.where('jumble', req.params.id ).desc("created").limit(100).run (err, items) ->
    wall = for item in items
      { url: Image.url(item.image, "100x100"), objectId: item._id }

    res.send
      title: 'Jumble',
      objects: wall,
      status: 200
      
app.get '/jumbles/:id/by-users', (req, res) ->
  Item.where('jumble', req.params.id ).desc("created").limit(100).populate("owner").run (err, items) ->
    
    itemsByUsers = {}
    for item in items
      byOwners[item.owner.id] ?= { user: item.owner, items: [] }
      byOwners[item.owner.id].items.push { 
        url: Image.url(item.image, "45x45")
        itemId: item._id
        user: owner 
      }

    res.send
      title: 'Jumble',
      items: itemsByUsers,
      status: 200


app.get '/jumbles/activity/clear', (req, res) ->
  Jumble.where().desc("created").limit(10).run (err, jumbles) ->
    
    for jumble in jumbles
      jumble.clearActivities()
      jumble.save()
      
    res.send
      title: 'Activity cleared'
      status: 200
        
    
# to create jumble activity entries
app.get '/jumbles/activity', (req, res) ->
  Jumble.find().desc("created").limit(10).run (err, jumbles) ->
    
    for jumble in jumbles
      
      # clear activities
      jumble.clearActivities()
      
      # create activities on items and populate jumble.activities
      jumble.fakeActivity()
        

  res.send
    title: 'Activity created',
    status: 200
          
app.post '/jumbles/create', (req, res) ->
  
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
        primaryObject = new Item( req.body['primaryObject'] )
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