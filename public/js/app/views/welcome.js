(function() {

  this.fimo.views.add("welcome", function() {
    return {
      template: _.template("<div class=\"welcome\">\n  <h1>Jumbler</h1>\n  <h3>more than a market</h3>\n</div>\n\n<a href=\"\" class=\"btn btn-primary btn-large\">Signup with Facebook</a>\n<a href=\"\" class=\"btn btn-twitter btn-large\">Signup with Twitter</a>\n\n<div class=\"separator\"><span>or</span></div>\n\n<a href=\"register\" class=\"btn btn-large\">\n  <i class=\"icon-user\"></i>\n  Signup with email\n</a>\n\n<div class=\"footnote\">\n  <a href=\"login\">Already have a Jumbler Account?</a>\n</div>"),
      click: function(event) {
        return true;
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
