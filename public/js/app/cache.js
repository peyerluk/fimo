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
        entry.expires = Date.now() + milisecondsToLive;
        entry.data = data;
        return store.set(key, entry);
      },
      remove: function(key) {
        return store.remove(key);
      },
      clean: function() {
        var entry, everything, key, now;
        now = Date.now();
        everything = store.getAll();
        for (key in everything) {
          entry = everything[key];
          if (/cache:/.exec(key)) {
            if (entry.expires < now) {
              store.remove(key);
              console.log("removed: " + key);
            }
          }
        }
        console.log("cache cleaned in " + (Date.now() - now) + "ms");
        return void 0;
      },
      wipe: function() {
        var entry, everything, key, now;
        now = Date.now();
        everything = store.getAll();
        for (key in everything) {
          entry = everything[key];
          if (/cache:/.exec(key)) {
            store.remove(key);
          }
        }
        return console.log("cache wiped in " + (Date.now() - now) + "ms");
      }
    };
  })();

}).call(this);
