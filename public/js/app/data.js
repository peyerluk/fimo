(function() {

  this.fimo.data = (function() {
    var server;
    server = "http://localhost:3000";
    return {
      load: function(page, callback) {
        return $.ajax({
          url: "" + server + "/" + page,
          dataType: "jsonp",
          success: function(data) {
            if (console) {
              console.log(data);
            }
            return callback(data);
          }
        });
      }
    };
  })();

}).call(this);
