(function() {

  this.fimo.views.add("login", function() {
    return {
      template: _.template("  <div class=\"narrow\">\n    <div class=\"handwriting handwriting-login\">\n      good to have you back!\n    </div>\n\n    <form class=\"login\">\n      <input type=\"email\" placeholder=\"email\" name=\"email\">\n      <input type=\"text\" placeholder=\"password\" name=\"password\">\n      <br>\n      <button class=\"btn btn-form btn-primary\" type=\"submit\">login</button>\n    </form>\n\n  </div>"),
      click: function(event) {
        console.log("clicked in login");
        if (event.target.getAttribute("type") === "submit") {
          event.preventDefault();
          return fimo.controller.jumbles();
        }
      },
      loaded: function() {
        return fimo.events.on("click", this.click);
      },
      destroy: function() {
        fimo.events.off("click", this.click);
        return console.log("destroyed login");
      }
    };
  });

}).call(this);
