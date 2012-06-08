# VARIABLES
appDir = "#{ __dirname }/../.."
express = require("express")
lessMiddleware = require('less-middleware')
expressPort = process.env.PORT || 3000

# we need to load User before mongoose-auth, so the plugins get initialized
User = require('../models/user') 
mongooseAuth = require('mongoose-auth')


# EXPRESS
app = express.createServer()

app.configure( ->
  
  # app.use(express.logger())
  app.use(express.methodOverride())
  app.use(express.bodyParser())
  app.use(express.cookieParser())
  app.use(express.session({ secret: 'I60b0ObILHStw7rx'}))
  app.use(mongooseAuth.middleware())
  # app.use(app.router)
  
  # # asset pipeline - js, coffee
  # bundle = require('browserify')("#{ appDir }/app/browser/test.js");
  # app.use(bundle);
  
  # # asset pipeline - less
  # app.use(lessMiddleware({
  #   src: "#{ appDir }/public/",
  #   compress: true
  # }));
  app.use(express.static("#{ appDir }/public"))
  
  # views & assets
  app.set('views', "#{ appDir }/app/views")
  app.set('view engine', 'jade')
  
  # mongoose-auth helpers
  mongooseAuth.helpExpress(app)
)

app.configure 'test', ->
  expressPort = 3011


app.configure 'development', ->
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))


app.configure 'production', ->
  app.use(express.errorHandler())
  console.log("running in production mode")


# // run internal server on port 3000
app.listen(expressPort)

# // EXPORT
module.exports = app