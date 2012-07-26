mongoose = require("../config/mongodb")
Schema = mongoose.Schema

Comment = new Schema({
  user:       { type: Schema.ObjectId, ref: "User" },
  userImage:  { type: Schema.ObjectId, ref: "Image" },
  username:   { type: String },
  jumble:     { type: Schema.ObjectId, ref: "Jumble" },
  coords:     { lon: Number, lat: Number },
  text:       { type: String },
  created:    { type: Date, default: Date.now }
})

# INDEXES
Comment.index( { coords: "2d" } )

# EXPORT
CommentModel = mongoose.model('Comment', Comment)
module.exports = CommentModel