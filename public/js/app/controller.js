(function() {

  this.fimo.controller = (function() {
    var $page, data, views;
    data = this.fimo.data;
    views = this.fimo.views;
    $page = $("#page");
    return {
      wall: function() {
        return fimo.data.load("wall", function(page) {
          return $page.html(views.wall({
            images: page.images
          }));
        });
      },
      profile: function() {
        return fimo.data.load("profile", function(page) {
          return $page.html(views.profile({
            username: page.username
          }));
        });
      }
    };
  })();

}).call(this);
