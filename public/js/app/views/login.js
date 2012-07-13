(function() {

  this.fimo.views.login = (function() {
    return {
      template: _.template("  <div class=\"narrow\">\n    <div class=\"handwriting\">\n      good to have you back!\n    </div>\n\n    <form class=\"login\">\n      <input type=\"email\" placeholder=\"email\" name=\"email\">\n      <input type=\"password\" placeholder=\"password\" name=\"password\">\n      <br>\n      <button class=\"btn btn-form btn-primary\" type=\"submit\">login</button>\n    </form>\n\n  </div>"),
      init: function() {
        return true;
      },
      destroy: function() {
        return true;
      }
    };
  })();

}).call(this);
