var mongoose = require("../../config/mongodb"),
    Schema = mongoose.Schema;
    
var Image = new Schema({
  user: { type: Schema.ObjectId, ref: 'User' },
  url: { 
    original: { type: String, required: true },
    thumbnails: Schema.Types.Mixed
  },
  coords: { lon: Number, lat: Number },
  location: Schema.Types.Mixed,
  likes: Number,
  created: { type: Date, default: Date.now }
});

// INDEXES
Image.index( { user: 1 } );
Image.index( { coords: "2d" } );

// EXPORT
var ImageModel = mongoose.model('Image', Image);
module.exports = ImageModel;