app = require("../config/express")
appDir = "#{ __dirname }/../.."
before = require("./middleware")
Image = require("../models/image")

app.get '/wall', (req, res) ->
  Image.where().desc("created").limit(100).run (err, images) ->
    
    imageUrls = for image in images
      image.url("100x100")
    
    res.send
      title: 'The Wall',
      images: imageUrls,
      status: 200

    
app.get '/image', (req, res) ->
  Image.findById req.query.id, (err, image) ->
    if err
      return res.send
        title: 'An Error occurred'
        error: err
        status: 500
        
    res.send
      title: 'An Image'
      url: image.url("300x")
      status: 200