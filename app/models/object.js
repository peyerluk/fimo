var Object, ObjectModel, Schema, mongoose;

mongoose = require("../config/mongodb");

Schema = mongoose.Schema;

Object = new Schema({
  owner: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  image: {
    type: Schema.ObjectId,
    ref: 'Image',
    required: true
  },
  tags: {
    type: [String]
  },
  jumble: {
    type: Schema.ObjectId,
    ref: "Jumble"
  },
  coords: {
    lon: Number,
    lat: Number
  },
  verbs: {
    type: [String]
  }
});

Object.index({
  coords: "2d"
});

ObjectModel = mongoose.model('Object', Object);

module.exports = ObjectModel;
