(function() {

  fimo.cache = (function() {
    var defaultToLive;
    defaultToLive = function() {
      return 60 * 60;
    };
    return {
      get: function(key) {
        var entry;
        key = "cache:" + key;
        entry = store.get(key);
        if (entry && entry.expires > Date.now()) {
          return entry.data;
        } else if (entry) {
          console.log("cache expired: " + key);
          store.remove(key);
          return void 0;
        } else {
          return void 0;
        }
      },
      set: function(key, data, _arg) {
        var entry, milisecondsToLive, persistent, secondsToLive;
        secondsToLive = _arg.secondsToLive, persistent = _arg.persistent;
        key = "cache:" + key;
        if (secondsToLive == null) {
          secondsToLive = defaultToLive();
        }
        entry = {};
        milisecondsToLive = secondsToLive * 1000;
        entry.expires = Date.now() + milisecondsToLife;
        entry.data = data;
        return store.set(key, entry);
      },
      clean: function() {}
    };
  })();

}).call(this);
