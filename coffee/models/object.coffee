mongoose = require("../config/mongodb")
Schema = mongoose.Schema

Object = new Schema({
  owner:      { type: Schema.ObjectId, ref: 'User', required: true },
  image:      { type: Schema.ObjectId, ref: 'Image', required: true },
  tags:       { type: [String] },
  # comments: ,
  jumble:     { type: String, default: "Philipps Veloliebhaber-Ecke" },
  coords:     { lon: Number, lat: Number },
  verbs:      { type: [String] }
})

# INDEXES
Object.index( { coords: "2d" } )

# EXPORT
ObjectModel = mongoose.model('Object', Object)
module.exports = ObjectModel