(function() {

  this.fimo.views.add("image", function() {
    return {
      template: _.template("<div>\n  <img src='<%= imageUrl %>' class=\"portrait\" width=\"300\">\n</div>"),
      click: function(event) {
        return true;
      },
      loaded: function() {
        return fimo.events.on("click", this.click);
      },
      destroy: function() {
        fimo.events.off("click", this.click);
        return console.log("destroyed image");
      }
    };
  });

}).call(this);
