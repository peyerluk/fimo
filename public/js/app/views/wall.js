(function() {

  this.fimo.views.add("wall", function() {
    var imageIdRegex;
    imageIdRegex = /\w*(?=_\w*\.(?=jpg|png))/i;
    return {
      template: _.template("<ul id=\"wall\" class=\"clearfix\">\n<% _.each(objects, function(object) { %>\n  <li>\n    <a href=\"object?objectId=<%=object.objectId%>&jumbleId=<%=jumbleId%>\"><img src='<%= object.url %>' width=\"100\" height=\"100\"></a>\n    <% console.log(object) %>\n    <% if ( object.lastActivity ) { %>\n      <i class=\"action-icon action-icon-<%= object.lastActivity %>\"></i>\n    <% } %>\n  </li> \n<% }); %>\n</ul>"),
      loaded: function() {
        return false;
      },
      destroy: function() {
        return false;
      }
    };
  });

}).call(this);
