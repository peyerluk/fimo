var Comment, Item, ItemModel, Schema, mongoose;

mongoose = require("../config/mongodb");

Schema = mongoose.Schema;

Comment = require("./comment");

Item = new Schema({
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
  comments: {
    type: [Comment]
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
  },
  created: {
    type: Date,
    "default": Date.now
  }
});

Item.index({
  coords: "2d"
});

ItemModel = mongoose.model('Item', Item);

module.exports = ItemModel;
