(function() {

  this.fimo.views.add("jumbles", function() {
    var jumble;
    jumble = _.template("<div class=\"jumble\">\n  <h2><%= title %></h2>\n  <div class=\"jumble-image\">\n    <img src=\"<%= imageSrc %>\" width=\"300\">\n  </div>\n  <div class=\"description\">Zürich</div>\n</div>");
    return {
      template: _.template("<div class=\"jumble-wall\">\n  <div class=\"handwriting handwriting-jumbles\">\n    <h3>welcome to jumbler!</h3>\n    <p>\n      If you don't find a jumble that suits you, open your own\n      by clicking the plus.\n    </p>\n  </div>\n  \n  <% _.each(jumbles, function(jumble) { %>\n    <div class=\"jumble\">\n      <h2><%=jumble['name']%></h2>\n      <div class=\"jumble-image\">\n        <a href=\"wall?jumbleId=<%=jumble['id']%>\"><img src=\"<%=jumble['imageUrl']%>\" width=\"300\" height=\"300\"></a>\n        <ul class=\"tags\">\n        <% _.chain(jumble['tags']).first(3).each(function(tag) { %>\n          <li><a href=\"\"><%= tag %></a></li>\n        <% }); %>\n        </ul>\n      </div>\n      <% if (jumble.activities && jumble.activities.length) { %>\n        <div class=\"jumble-activity\">\n          <% var i = 0 %>\n          <% _.chain(jumble.activities).first(4).each(function(activity) { %>\n          <% i += 1; %>\n            <a href=\"object?objectId=<%= activity.itemId %>&jumbleId=<%= jumble.id %>\">\n              <img src=\"<%= activity.itemImage %>\" width=\"55\" heigth=\"55\">\n              <i class=\"action-icon action-icon-<%= activity.activity %>\"></i>\n              <% activity.activity %>\n            </a>\n          <% }) %>\n          <div class=\"jumble-activity-indicator\"><span class=\"badge badge-inverse\"><%= i %></span> latest activity</div>\n        </div>\n      <% } %>\n    </div>\n  <% }); %>\n  \n</div>"),
      loaded: function() {
        return false;
      },
      destroy: function() {
        return false;
      }
    };
  });

}).call(this);
