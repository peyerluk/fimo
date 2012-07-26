mongoose = require("../config/mongodb")
Schema = mongoose.Schema
Comment = require("./comment")
Image = require("./image")

Item = new Schema({
  owner:      { type: Schema.ObjectId, ref: 'User', required: true },
  image:      { type: Schema.ObjectId, ref: 'Image', required: true },
  tags:       { type: [String] },
  comments:   { type: [Comment.schema] },
  jumble:     { type: Schema.ObjectId, ref: "Jumble" },
  coords:     { lon: Number, lat: Number },
  verbs:      { type: [String] },
  lastActivity: { type: String },
  created:    { type: Date, default: Date.now }
})

Item.methods.getComments = () ->
  itemComments = for comment in this.comments
    { text : comment.text, userImageUrl : Image.url(comment.userImage, "30x30"), username : comment.username, userId: comment.user }
  itemComments  

# INDEXES
Item.index( { coords: "2d" } )

# EXPORT
ItemModel = mongoose.model('Item', Item)
module.exports = ItemModel
