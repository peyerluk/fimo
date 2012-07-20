(function() {

  this.fimo.device = (function() {
    var onDeviceReady, _agent, _phoneGapStack, _ready;
    _ready = false;
    _phoneGapStack = [];
    if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
      _agent = "phone";
    } else {
      _agent = "browser";
    }
    onDeviceReady = function() {
      var callback, _i, _len, _results;
      _ready = true;
      _results = [];
      for (_i = 0, _len = _phoneGapStack.length; _i < _len; _i++) {
        callback = _phoneGapStack[_i];
        _results.push(callback());
      }
      return _results;
    };
    return {
      init: (function() {
        document.addEventListener("deviceready", onDeviceReady, false);
        return true;
      })(),
      ready: function(callback) {
        if (_ready) {
          return callback();
        } else {
          return _phoneGapStack.push(callback);
        }
      },
      getAgent: function() {
        return _agent;
      },
      isReady: function() {
        return _ready;
      },
      isRunning: function() {
        return window.cordova;
      }
    };
  })();

}).call(this);
