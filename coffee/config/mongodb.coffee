mongoose = require('mongoose')

# MONGODB
if ( process.env.NODE_ENV == undefined )
  mongoose.connect('mongodb://localhost/fimo');


if ( process.env.NODE_ENV == "test" )
  mongoose.connect('mongodb://localhost/fimo_test');


if ( process.env.NODE_ENV == "production" )
  mongoose.connect(process.env.MONGOLAB_URI);


# EXPORT
module.exports = mongoose;