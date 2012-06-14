(function() {

  this.fimo.views = (function() {
    return {
      wall: _.template("<ul id=\"wall\" class=\"clearfix\">\n<% _.each(images, function(image) { %>\n  <li><img src='<%= image %>' width=\"100\" height=\"100\"></li> \n<% }); %>\n</ul>"),
      image: _.template("<div>\n  <nav class=\"top-nav\">\n    <a href=\"wall\" class=\"btn back\">back</a>\n  </nav>\n  <img src='<%= imageUrl %>' class=\"portrait\" width=\"300\">\n</div>"),
      profile: _.template("<div>\n  <h1><%= username %></h1>\n</div>")
    };
  })();

}).call(this);
