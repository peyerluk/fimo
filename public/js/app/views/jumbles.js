(function() {

  this.fimo.views.add("jumbles", function() {
    var jumble;
    jumble = _.template("<div class=\"jumble\">\n  <h2><%= title %></h2>\n  <div class=\"jumble-image\">\n    <img src=\"<%= imageSrc %>\" width=\"300\">\n  </div>\n  <div class=\"description\">Zürich</div>\n</div>");
    return {
      template: _.template("<div class=\"jumble-wall\">\n  <div class=\"handwriting handwriting-jumbles\">\n    <h3>welcome to jumbler!</h3>\n    If you don't find a jumble that suits you, open your own\n    by clicking the plus.\n  </div>\n  \n  <div class=\"jumble\">\n    <h2>Rearrange your home</h2>\n    <div class=\"jumble-image\">\n      <img src=\"http://fimo.s3.amazonaws.com/images/4fff0a570df2a02233000017_300x.jpg\" width=\"300\">\n      <ul class=\"tags\">\n        <li><a href=\"\">decoration</a></li>\n        <li><a href=\"\">modern</a></li>\n      </ul>\n    </div>\n    <div class=\"description\">Zürich</div>\n  </div>\n  <div class=\"jumble\">\n    <h2>Wooden Furniture</h2>\n    <div class=\"jumble-image\">\n      <img src=\"http://fimo.s3.amazonaws.com/images/4fff0a2e0df2a02233000007_300x.jpg\" width=\"300\">\n      <ul class=\"tags\">\n        <li><a href=\"\">wood</a></li>\n        <li><a href=\"\">vintage</a></li>\n        <li><a href=\"\">furniture</a></li>\n      </ul>\n    </div>\n    <div class=\"description\">Zürich</div>\n  </div>\n</div>"),
      click: function(event) {
        jumble = $(event.target).parents(".jumble");
        if (jumble.length) {
          return fimo.controller.wall();
        }
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
