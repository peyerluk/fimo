
/* NAMCESPACES
*/


(function() {
  var fimo;

  this.fimo = {};

  fimo = this.fimo;

  /* FIMO INITIALIZATION
  */


  fimo.init = function() {
    var controller;
    controller = fimo.controller;
    fimo.user.init();
    $(document).on("click", "a", function(event) {
      var action, path;
      event.preventDefault();
      path = this.getAttribute("href");
      action = controller[path];
      if (action) {
        action();
      } else if (path !== "" && path !== "#") {
        alert("" + path + " not implemented");
      }
      return void 0;
    });
    $(document).on("click", function(event) {
      fimo.events.fire("click", event);
      return void 0;
    });
    controller.welcome();
    return fimo.cache.clean();
  };

}).call(this);
