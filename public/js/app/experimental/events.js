(function() {
  var id;

  id = 0;

  this.fimo.events = (function() {
    var ensureMethodId;
    ensureMethodId = function(method) {
      if (method.id === void 0) {
        method.id = id++;
      }
      return method;
    };
    return {
      triggers: {},
      on: function(trigger, method) {
        var _base, _ref;
        console.log("hallo");
        if ((_ref = (_base = this.triggers)[trigger]) == null) {
          _base[trigger] = [];
        }
        ensureMethodId(method);
        this.triggers[trigger].push({
          name: trigger,
          instance: method.id,
          action: method
        });
        return console.log(this.triggers);
      },
      off: function(trigger, method) {
        var listener;
        if (method && method.id !== void 0) {
          return this.triggers = (function() {
            var _i, _len, _ref, _results;
            _ref = this.triggers[trigger];
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              listener = _ref[_i];
              if (listener.instance !== method.id) {
                _results.push(listener);
              }
            }
            return _results;
          }).call(this);
        }
      },
      removeTrigger: function(trigger) {
        return this.triggers[trigger] = null;
      },
      fire: function(trigger) {
        var listener, params, result, _i, _len, _ref;
        result = true;
        if (!this.triggers[trigger]) {
          return result;
        }
        params = Array.prototype.slice.call(arguments, 1);
        _ref = this.triggers[trigger];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          listener = _ref[_i];
          if (listener.action.call(void 0, params) === false) {
            result = false;
          }
        }
        return result;
      }
    };
  })();

}).call(this);
