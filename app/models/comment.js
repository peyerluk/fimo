var Comment, CommentModel, Schema, mongoose;

mongoose = require("../config/mongodb");

Schema = mongoose.Schema;

Comment = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User"
  },
  jumble: {
    type: Schema.ObjectId,
    ref: "Jumble"
  },
  coords: {
    lon: Number,
    lat: Number
  },
  text: {
    type: String
  },
  created: {
    type: Date,
    "default": Date.now
  }
});

Comment.index({
  coords: "2d"
});

CommentModel = mongoose.model('Comment', Comment);

module.exports = CommentModel;
