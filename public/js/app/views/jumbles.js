(function() {

  this.fimo.views.add("jumbles", function() {
    var jumble;
    jumble = _.template("<div class=\"jumble\">\n  <h2><%= title %></h2>\n  <div class=\"jumble-image\">\n    <img src=\"<%= imageSrc %>\" width=\"300\">\n  </div>\n  <div class=\"description\">Zürich</div>\n</div>");
    return {
      template: _.template("<div class=\"jumble-wall\">\n  <div class=\"handwriting handwriting-jumbles\">\n    <h3>welcome to jumbler!</h3>\n    If you don't find a jumble that suits you, open your own\n    by clicking the plus.\n  </div>\n  \n  <% _.each(jumbles, function(jumble) { %>\n    <div class=\"jumble\">\n      <h2><%=jumble['name']%></h2>\n      <div class=\"jumble-image\">\n        <a href=\"wall?jumbleId=<%=jumble['id']%>\"><img src=\"<%=jumble['imageUrl']%>\" width=\"300\" height=\"300\"></a>\n        <ul class=\"tags\">\n        <% \n          var i = 0;\n          _.each(jumble['tags'], function(tag) { \n          i += 1;\n          if (i < 4) { \n        %>\n          <li><a href=\"\"><%= tag %></a></li>\n        <% }}); %>\n        </ul>\n      </div>\n    </div>\n  <% }); %>\n  \n</div>"),
      loaded: function() {
        return false;
      },
      destroy: function() {
        return false;
      }
    };
  });

}).call(this);
