var Comment, Image, Item, ItemModel, Schema, mongoose;

mongoose = require("../config/mongodb");

Schema = mongoose.Schema;

Comment = require("./comment");

Image = require("./image");

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
    type: [Comment.schema]
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
  lastActivity: {
    type: String
  },
  created: {
    type: Date,
    "default": Date.now
  }
});

Item.methods.getComments = function() {
  var comment, itemComments;
  itemComments = (function() {
    var _i, _len, _ref, _results;
    _ref = this.comments;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      comment = _ref[_i];
      _results.push({
        text: comment.text,
        userImageUrl: Image.url(comment.userImage, "30x30"),
        username: comment.username,
        userId: comment.user
      });
    }
    return _results;
  }).call(this);
  return itemComments;
};

Item.index({
  coords: "2d"
});

ItemModel = mongoose.model('Item', Item);

module.exports = ItemModel;
