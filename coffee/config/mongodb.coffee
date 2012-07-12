mongoose = require('mongoose')

# MONGODB
if process.env.NODE_ENV == undefined
  if process.env.MONGOLAB_URI
    mongoose.connect(process.env.MONGOLAB_URI)
  else
    console.log("!! could not find MONGOLAB_URI config var. Please make sure .env file is present and use 'foreman start'")
    mongoose.connect('mongodb://localhost/fimo')


if process.env.NODE_ENV == "test"
  mongoose.connect('mongodb://localhost/fimo_test')


if process.env.NODE_ENV == "production"
  mongoose.connect(process.env.MONGOLAB_URI)


# EXPORT
module.exports = mongoose