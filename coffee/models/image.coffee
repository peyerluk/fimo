mongoose = require("../config/mongodb")
s3 = require("../config/s3")
fs = require("fs")
im = require("imagemagick")
Schema = mongoose.Schema
_ = require('underscore')._
    
Image = new Schema({
  user: { type: Schema.ObjectId, ref: 'User' },
  thumbnails: [String],
  coords: { lon: Number, lat: Number },
  location: Schema.Types.Mixed,
  likes: Number,
  created: { type: Date, default: Date.now }
})

Image.statics.create = (uploadedImage, user, callback) ->
  img = new ImageModel({
    user: user.id
  })
  
  fs.writeFile img.tmpPath(), uploadedImage, (err) ->
    img.crop "100x100", ->
      img.resize "300x", ->
        img.save (err) ->
          img.uploadS3 ->
            callback(undefined, img)


# upload uploaded image and all thumbnails to s3
# param callback: (err, res)
Image.methods.uploadS3 = (callback) ->
  uploadComplete = _.after (this.thumbnails.length + 1), ->
    callback()
  
  s3.putFile(this.tmpPath(), this.s3Path(), uploadComplete)
  for suffix in this.thumbnails
    s3.putFile(this.tmpPath(suffix), this.s3Path(suffix), uploadComplete)
    

Image.methods.crop = (size, callback) ->
  output = this.tmpPath(size)
  this.thumbnails.push(size)
  
  im.convert [this.tmpPath(), '-resize', '100x100^', '-gravity', 'center', '-crop', "#{ size }+0+0", output], ->
    callback()
    
Image.methods.resize = (size, callback) ->
  output = this.tmpPath(size)
  this.thumbnails.push(size)
  
  im.convert [this.tmpPath(), '-resize', size, output], ->
    callback()

# s3 and temporary file locations
Image.methods.tmpPath = (suffix) ->
  tmpDir = __dirname + "/../../tmp"
  if suffix
    "#{ tmpDir }/#{ this.id }_#{ suffix }.jpg"
  else
    "#{ tmpDir }/#{ this.id }.jpg"
  
Image.methods.s3Path = (suffix) ->
  if suffix
    "/images/#{ this.id }_#{ suffix }.jpg"
  else
    "/images/#{ this.id }.jpg"

Image.methods.url = ->
  "http://fimo.s3.amazonaws.com/images/#{ this.id }.jpg"



# INDEXES
Image.index( { user: 1 } )
Image.index( { coords: "2d" } )

# EXPORT
ImageModel = mongoose.model('Image', Image)
module.exports = ImageModel