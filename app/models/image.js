var Image, ImageModel, Schema, fs, im, mongoose, s3, _;

mongoose = require("../config/mongodb");

s3 = require("../config/s3");

fs = require("fs");

im = require("imagemagick");

Schema = mongoose.Schema;

_ = require('underscore')._;

Image = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  thumbnails: [String],
  likes: Number,
  created: {
    type: Date,
    "default": Date.now
  }
});

Image.statics.create = function(uploadedImage, user, callback) {
  var img;
  img = new ImageModel({
    user: user.id
  });
  return fs.writeFile(img.tmpPath(), uploadedImage, function(err) {
    return img.crop("100x100", function() {
      return img.resize("300x", function() {
        return img.save(function(err) {
          if (err) {
            return callback(err, img);
          } else {
            return img.uploadS3(function() {
              return callback(void 0, img);
            });
          }
        });
      });
    });
  });
};

Image.methods.uploadS3 = function(callback) {
  var suffix, uploadComplete, _i, _len, _ref, _results;
  uploadComplete = _.after(this.thumbnails.length + 1, function() {
    return callback();
  });
  s3.putFile(this.tmpPath(), this.s3Path(), uploadComplete);
  _ref = this.thumbnails;
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    suffix = _ref[_i];
    _results.push(s3.putFile(this.tmpPath(suffix), this.s3Path(suffix), uploadComplete));
  }
  return _results;
};

Image.methods.crop = function(size, callback) {
  var output;
  output = this.tmpPath(size);
  this.thumbnails.push(size);
  return im.convert([this.tmpPath(), '-resize', '100x100^', '-gravity', 'center', '-crop', "" + size + "+0+0", output], function() {
    return callback();
  });
};

Image.methods.resize = function(size, callback) {
  var output;
  output = this.tmpPath(size);
  this.thumbnails.push(size);
  return im.convert([this.tmpPath(), '-resize', size, output], function() {
    return callback();
  });
};

Image.methods.tmpPath = function(suffix) {
  var tmpDir;
  tmpDir = __dirname + "/../../tmp";
  if (suffix) {
    return "" + tmpDir + "/" + this.id + "_" + suffix + ".jpg";
  } else {
    return "" + tmpDir + "/" + this.id + ".jpg";
  }
};

Image.methods.s3Path = function(suffix) {
  if (suffix) {
    return "/images/" + this.id + "_" + suffix + ".jpg";
  } else {
    return "/images/" + this.id + ".jpg";
  }
};

Image.methods.url = function(suffix) {
  if (suffix) {
    return "http://fimo.s3.amazonaws.com/images/" + this.id + "_" + suffix + ".jpg";
  } else {
    return "http://fimo.s3.amazonaws.com/images/" + this.id + ".jpg";
  }
};

Image.index({
  user: 1
});

Image.index({
  coords: "2d"
});

ImageModel = mongoose.model('Image', Image);

module.exports = ImageModel;
