(function() {

  this.fimo.views.add("object", function() {
    return {
      template: _.template("<div>\n  <div class=\"object-user clearfix\">\n    <img src=\"<%= content.userImage %>\" width=\"45\" height=\"45\">\n    <div>\n      <em class=\"name\"><%= content.user.username %></em>\n      <em class=\"object-jumble\"><%= content.jumbleName %></em>\n    </div>\n  </div>\n  <div class=\"object-image\">\n    <img src='<%= content.imageUrl %>' class=\"\" width=\"300\" height=\"300\">\n    <div class=\"verbs\">\n      <% _.each(content.verbs, function(verb) { %>\n        <div class=\"badge badge-info\"><i class=\"icon icon-white icon-star\"></i><%= verb %></div>\n      <% }); %>\n    </div>\n  </div>\n  \n  <div class=\"object-comments\">\n    <ul class=\"tags clearfix\">\n      <% _.each(content.tags, function(tag) { %>\n        <li><a href=\"\"><%= tag %></a></li>\n      <% }); %>\n    </ul>\n    \n    <div class=\"comment no-comments\">\n      <img src=\"img/profile-30x30.png\" width=\"30\" height=\"30\">\n      <div>\n        no comments yet, dare say something?\n      </div>\n    </div>\n    \n    <form>\n      <div class=\"btn btn-primary\"><i class=\"icon icon-camera icon-white\"></i>&nbsp;</div>\n      <input type=text placeholder=\"comment (#tag)\">\n      <div class=\"btn btn-white\"><i class=\"icon icon-lock\"></i>&nbsp;</div>\n    </form>\n  </div>\n  \n</div>"),
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
