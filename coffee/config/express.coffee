# VARIABLES
appDir = "#{ __dirname }/../.."
express = require("express")
_ = require("underscore")
lessMiddleware = require('less-middleware')
expressPort = process.env.PORT || 3000

# we need to load User before mongoose-auth, so the plugins get initialized
User = require('../models/user') 
mongooseAuth = require('mongoose-auth')
os = require('os')
fs = require('fs')
ifaces = os.networkInterfaces()


# EXPRESS
app = express.createServer()

app.configure 'development', ->
  app.use (req, res, next) ->
    headers = { 'Cache-Control' : 'max-age:120' }
    if !_.isUndefined req.headers.origin
      headers = _.extend headers, {
        'Access-Control-Allow-Origin': req.headers.origin
      , 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      , 'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With, X-PINGOTHER'
      , 'Access-Control-Max-Age': 86400 
      }
    _.each headers, ( value, key ) ->
      res.setHeader key, value
      
    next()
  
app.configure( ->
  # app.use(express.logger())
  app.use(express.methodOverride())
  app.use(express.bodyParser())
  app.use(express.cookieParser())
  app.use(express.session({ secret: 'I60b0ObILHStw7rx'}))
  app.use(mongooseAuth.middleware())
  # app.use(app.router) # Cannot use app.router together with mongooseAuth!
  
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
  
  # jsonp - so the iphone app can make calls from another domain (e.g. localhost)
  app.enable("jsonp callback");
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

for key, iface of ifaces
  for dev in iface
    if dev.family && dev.family == 'IPv4' # only IPv4
      unless dev.address.split(".")[0] == '127' # skip the local loopback
        fs.writeFileSync("public/coffee/hostname.coffee", "@fimo.hostname = '#{dev.address}:3000'")
        console.log("rewriting dev server address to: " + dev.address)
      
# // EXPORT
module.exports = app