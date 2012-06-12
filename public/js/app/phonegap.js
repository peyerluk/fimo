(function() {

  this.fimo.device = (function() {
    var onDeviceReady, _phoneGapStack, _ready;
    _ready = false;
    _phoneGapStack = [];
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
      }
    };
  })();

}).call(this);
