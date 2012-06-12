(function() {

  this.fimo.data = (function() {
    var server;
    server = "http://172.21.21.150:3000";
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
      },
      post: function(page, data, callback) {
        return $.post("" + server + "/" + page, {
          data: data
        });
      }
    };
  })();

}).call(this);
