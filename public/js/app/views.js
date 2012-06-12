(function() {

  this.fimo.views = (function() {
    return {
      wall: _.template("<ul id=\"wall\">\n<% _.each(images, function(image) { %>\n  <li><img src='<%= image %>' width=\"100\" height=\"100\"></li> \n<% }); %>\n</ul>"),
      profile: _.template("<div>\n  <h1><%= username %></h1>\n</div>")
    };
  })();

}).call(this);
