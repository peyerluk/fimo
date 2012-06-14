(function() {

  this.fimo.views = (function() {
    return {
      wall: _.template("<ul id=\"wall\" class=\"clearfix\">\n<% _.each(images, function(image) { %>\n  <li><img src='<%= image %>' width=\"100\" height=\"100\"></li> \n<% }); %>\n</ul>"),
      image: _.template("<a href=\"wall\" class=\"back\">back</a>\n<img src='<%= imageUrl %>' class=\"portrait\" width=\"300\">"),
      profile: _.template("<div>\n  <h1><%= username %></h1>\n</div>")
    };
  })();

}).call(this);
