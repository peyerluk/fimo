var mongoose = require("../../config/mongodb"),
    Schema = mongoose.Schema;
    
var User = new Schema({
  username: { type: String, required: true },
  name: { prename: String, surname: String },
  coords: { lon: Number, lat: Number },
  location: { 
    country: String, 
    region: String, 
    city: String,
    address: Schema.Types.Mixed
  },
  created: { type: Date, default: Date.now }
});

// INDEXES
User.index( { coords: "2d" } );

// EXPORT
var UserModel = mongoose.model('User', User);
module.exports = UserModel;