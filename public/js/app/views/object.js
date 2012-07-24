(function() {

  this.fimo.views.add("object", function() {
    return {
      template: _.template("<div>\n  <div class=\"object-user\">\n    <img src=\"img/profile-small.png\">\n    <span><%= content.user.email %></span>\n  </div>\n  <div class=\"object-image\">\n    <img src='<%= content.imageUrl %>' class=\"portrait\" width=\"300\">\n    <ul class=\"tags\">\n      <% _.each(content.tags, function(tag) { %>\n        <li><a href=\"\"><%= tag %></a></li>\n      <% }); %>\n    </ul>\n  </div>\n  <div><%= content.verbs %></div>\n</div>"),
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
