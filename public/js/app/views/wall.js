(function() {

  this.fimo.views.add("wall", function() {
    var imageIdRegex;
    imageIdRegex = /\w*(?=_\w*\.(?=jpg|png))/i;
    return {
      template: _.template("<ul class=\"wall clearfix\">\n<% _.each(items, function(item) { %>\n  <li>\n    <a href=\"object?objectId=<%= item.itemId %>&jumbleId=<%= jumbleId %>\"><img src='<%= item.url %>' width=\"100\" height=\"100\"></a>\n    <% if ( item.lastActivity ) { %>\n      <i class=\"action-icon action-icon-<%= item.lastActivity %>\"></i>\n    <% } %>\n  </li> \n<% }); %>\n</ul>"),
      loaded: function() {
        return false;
      },
      destroy: function() {
        return false;
      }
    };
  });

}).call(this);
