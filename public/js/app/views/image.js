(function() {

  this.fimo.views.add("image", function() {
    return {
      template: _.template("<div>\n  <div class=\"object-image\">\n    <img src='<%= imageUrl %>' class=\"portrait\" width=\"300\">\n    <ul class=\"tags\">\n      <li><a href=\"\">vintage</a></li>\n      <li><a href=\"\">decoration</a></li>\n    </ul>\n  </div>\n</div>"),
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
