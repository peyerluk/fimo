var mongoose;

mongoose = require('mongoose');

if (process.env.NODE_ENV === void 0) {
  mongoose.connect('mongodb://localhost/fimo');
}

if (process.env.NODE_ENV === "test") {
  mongoose.connect('mongodb://localhost/fimo_test');
}

if (process.env.NODE_ENV === "production") {
  mongoose.connect(process.env.MONGOLAB_URI);
}

module.exports = mongoose;
