(function() {

  this.fimo.views.add("wallByUsers", function() {
    var imageIdRegex;
    imageIdRegex = /\w*(?=_\w*\.(?=jpg|png))/i;
    return {
      template: _.template("<div>\n<% _.each(itemsByUsers, function(section) { %>\n<div class=\"wall-user clearfix\">\n  <img src=\"<%= section.user.userImage %>\" width=\"45\" height=\"45\">\n  <div class=\"name\">\n    <%= section.user.username %> <span class=\"badge badge-inverse-not\"><%= section.items.length %></span>\n  </div>\n</div>\n<ul class=\"wall clearfix\">\n  <% _.each(section.items, function(item) { %>\n  <li>\n    <a href=\"object?objectId=<%= item.itemId %>&jumbleId=<%= jumbleId %>\"><img src='<%= item.url %>' width=\"100\" height=\"100\"></a>\n    <% if ( item.lastActivity ) { %>\n      <i class=\"action-icon action-icon-<%= item.lastActivity %>\"></i>\n    <% } %>\n  </li>\n  <% }) %>\n </ul> \n<% }); %>\n</div>"),
      loaded: function() {
        return false;
      },
      destroy: function() {
        return false;
      }
    };
  });

}).call(this);
