# Development Environment only:
# Set IP address and port of current machine for the browser javascript
# The file public/coffee/hostname.coffee should be in .gitignore

if process.env.NODE_ENV == undefined
  os = require('os')
  fs = require('fs')
  ifaces = os.networkInterfaces()
  expressPort = process.env.PORT || 3000
  
  for key, iface of ifaces
    for dev in iface
      if dev.family && dev.family == 'IPv4' # only IPv4
        unless dev.address.split(".")[0] == '127' # skip the local loopback
          serverAddr = "@fimo.hostname = 'http://#{dev.address}:#{ expressPort }'"
          fs.writeFileSync("public/coffee/hostname.coffee", serverAddr)
          console.log("setting broser javascript: #{ serverAddr }")
  
