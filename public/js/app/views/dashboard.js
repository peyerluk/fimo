(function() {

  this.fimo.views.add("dashboard", function() {
    return {
      template: _.template("<div>\n  <ul class=\"dashboard\">\n    <li class=\"dashboard-title\">Jumbles</li>\n    <li><a href=\"jumbles\">Jumbles nearby</a></li>\n    <li><a href=\"jumbles\">My jumbles</a></li>\n    <li class=\"dashboard-title\">User</li>\n    <li><a href=\"profile\">Profile</a></li>\n    <li><a href=\"logout\">Logout</a></li>\n  </ul>\n</div>"),
      click: function(event) {
        return true;
      },
      loaded: function() {
        return fimo.events.on("click", this.click);
      },
      destroy: function() {
        return fimo.events.off("click", this.click);
      }
    };
  });

}).call(this);
