(function() {

  this.fimo.events = (function() {
    return {
      triggers: {},
      add: function(trigger, instance, method) {
        var _base, _ref;
        if ((_ref = (_base = this.triggers)[trigger]) == null) {
          _base[trigger] = [];
        }
        return this.triggers[trigger].push({
          name: trigger,
          instance: instance,
          action: method
        });
      },
      remove: function(trigger, instance) {
        var listener;
        return this.triggers = (function() {
          var _i, _len, _ref, _results;
          _ref = this.triggers[trigger];
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            listener = _ref[_i];
            if (listener.instance !== instance) {
              _results.push(listener);
            }
          }
          return _results;
        }).call(this);
      },
      removeTrigger: function(trigger) {
        return this.triggers[trigger] = null;
      },
      fire: function(trigger, param) {
        var listener, _i, _len, _ref, _results;
        if (!this.triggers[trigger]) {
          return;
        }
        _ref = this.triggers[trigger];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          listener = _ref[_i];
          _results.push(listener.instance[listener.action](param));
        }
        return _results;
      }
    };
  })();

}).call(this);
