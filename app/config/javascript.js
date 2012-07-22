var dev, expressPort, fs, iface, ifaces, key, os, serverAddr, _i, _len;

if (process.env.NODE_ENV === void 0) {
  os = require('os');
  fs = require('fs');
  ifaces = os.networkInterfaces();
  expressPort = process.env.PORT || 3000;
  for (key in ifaces) {
    iface = ifaces[key];
    for (_i = 0, _len = iface.length; _i < _len; _i++) {
      dev = iface[_i];
      if (dev.family && dev.family === 'IPv4') {
        if (dev.address.split(".")[0] !== '127') {
          serverAddr = "@fimo.hostname = 'http://" + dev.address + ":" + expressPort + "'";
          fs.writeFileSync("public/coffee/hostname.coffee", serverAddr);
          console.log("setting browser javascript: " + serverAddr);
        }
      }
    }
  }
}
