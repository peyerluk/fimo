
/* NAMCESPACES
*/


(function() {
  var fimo, onDeviceReady, phoneGapStack, ready;

  this.fimo = {};

  fimo = this.fimo;

  fimo.device = {};

  ready = false;

  phoneGapStack = [];

  /* FIMO INITIALIZATION
  */


  fimo.init = function() {
    var controller;
    controller = fimo.controller;
    if (store.get('user')) {

    } else {

    }
    return $(document).on("click", "a", function(event) {
      var action, path;
      event.preventDefault();
      path = this.getAttribute("href");
      action = controller[path];
      if (action) {
        action();
      } else {
        alert("" + path + " not implemented");
      }
      return void 0;
    });
  };

  onDeviceReady = function() {
    var callback, _i, _len;
    for (_i = 0, _len = phoneGapStack.length; _i < _len; _i++) {
      callback = phoneGapStack[_i];
      callback();
    }
    return ready = true;
  };

  fimo.device.ready = function(callback) {
    if (ready) {
      return callback();
    } else {
      return phoneGapStack.push(callback);
    }
  };

  document.addEventListener("deviceready", onDeviceReady, false);

}).call(this);
