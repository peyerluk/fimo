(function() {

  this.fimo.navigation = (function() {
    var $nav, back, jumbles, wall;
    $nav = $("#navbar");
    jumbles = _.template("<ul class=\"navbar-items\">\n  <li><a href=\"jumbles\" class=\"btn btn-navbar\"><i class=\"icon-align-justify\"></i></a></li>\n  <li><div id=\"navbar-title\"><%= title %></div></li>\n  <li class=\"navbar-right\"><a href=\"addJumble\" class=\"btn btn-navbar\"><i class=\"icon-plus\"></i></a></li>\n</ul>");
    wall = _.template("<ul class=\"navbar-items\">\n  <li><a href=\"<%= back %>\" class=\"btn btn-navbar\">back</a></li>\n  <li><div id=\"navbar-title\" class=\"navbar-title-back\"><%= title %></div></li>\n  <li class=\"navbar-right\"><a href=\"add\" class=\"btn btn-navbar\"><i class=\"icon-plus\"></i></a></li>\n</ul>");
    back = _.template("<ul class=\"navbar-items\">\n  <li><a href=\"<%= back %>\" class=\"btn btn-navbar\">back</a></li>\n  <li><div id=\"navbar-title\" class=\"navbar-title-back\"><%= title %></div></li>\n</ul>");
    return fimo.events.on("afterPageLoaded", function(viewName) {
      var title;
      console.log("afterPageLoaded: " + viewName);
      title = $("#navbar-title").html();
      console.log(title);
      switch (viewName) {
        case "jumbles":
          return $nav.html(jumbles({
            title: title
          }));
        case "wall":
          return $nav.html(wall({
            title: title,
            back: "jumbles"
          }));
        case "image":
          return $nav.html(back({
            title: title,
            back: "wall"
          }));
        case "login":
        case "register":
          return $nav.html(back({
            title: title,
            back: "welcome"
          }));
        default:
          return $nav.html(back({
            title: title,
            back: "back"
          }));
      }
    });
  })();

}).call(this);