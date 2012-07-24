(function() {

  this.fimo.views.add("object", function() {
    return {
      template: _.template("<div>\n  <div class=\"object-user clearfix\">\n    <img src=\"img/profile-small.png\">\n    <div>\n      <em><%= content.user.email %></em>\n      <em class=\"object-jumble\">Traceys Jumble</em>\n    </div>\n  </div>\n  <div class=\"object-image\">\n    <img src='<%= content.imageUrl %>' class=\"\" width=\"300\">\n    <ul class=\"tags\">\n      <% _.each(content.tags, function(tag) { %>\n        <li><a href=\"\"><%= tag %></a></li>\n      <% }); %>\n    </ul>\n    <div class=\"verbs\">\n      <% _.each(content.verbs, function(verb) { %>\n        <div class=\"badge badge-info\"><i class=\"icon icon-white icon-star\"></i><%= verb %></div>\n      <% }); %>\n    </div>\n  </div>\n  <div class=\"object-comments\">\n    <div class=\"no-comments\">\n      no comments yet, dare say something?\n    </div>\n    <form>\n      <div class=\"btn btn-primary\"><i class=\"icon icon-camera icon-white\"></i>&nbsp;</div>\n      <input type=text placeholder=\"comment (#tag)\">\n      <div class=\"btn btn-white\"><i class=\"icon icon-lock\"></i>&nbsp;</div>\n    </form>\n  </div>\n  \n</div>"),
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
