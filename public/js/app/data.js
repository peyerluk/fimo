(function() {

  this.fimo.data = (function() {
    var cache, server;
    server = this.fimo.hostname || "http://fimo.herokuapp.com";
    cache = fimo.cache;
    return {
      load: function(page, callback) {
        var cached;
        if (cached = cache.get(page)) {
          return callback(cached);
        } else {
          return $.ajax({
            url: "" + server + "/" + page,
            dataType: "json",
            success: function(data) {
              cache.set(page, data, {
                 secondsToLive: 10 * 60
              });
              return callback(data);
            },
            error: function(jqXHR, error) {
              return console.log(error);
            }
          });
        }
      },
      post: function(page, data, callback, errorCallback) {
        console.log("posting to " + server + "/" + page);
        return $.ajax({
          type: 'POST',
          url: "" + server + "/" + page,
          dataType: "json",
          data: data,
          success: function(data) {
            if (callback) {
              return callback(data);
            }
          },
          error: function(data, error, exception) {
            if (console) {
              console.log("error from ajax request: " + error + ", " + exception);
            }
            if (errorCallback) {
              return errorCallback();
            }
          }
        });
      }
    };
  })();

}).call(this);
