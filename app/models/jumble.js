var Item, Jumble, JumbleModel, Schema, User, mongoose;

mongoose = require("../config/mongodb");

Schema = mongoose.Schema;

User = require("./user");

Item = require("./object");

Jumble = new Schema({
  owner: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  primaryObject: {
    type: Schema.ObjectId,
    ref: 'Item',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  tags: {
    type: [String]
  },
  objects: {
    type: [Item]
  },
  participants: {
    type: [User]
  },
  coords: {
    lon: Number,
    lat: Number
  },
  created: {
    type: Date,
    "default": Date.now
  }
});

Jumble.index({
  coords: "2d"
});

JumbleModel = mongoose.model('Jumble', Jumble);

module.exports = JumbleModel;
