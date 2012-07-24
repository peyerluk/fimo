
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
      var action, elements, params, path;
      event.preventDefault();
      path = this.getAttribute("href");
      elements = path.split("?");
      path = elements[0];
      params = void 0;
      if (elements.length > 1) {
        params = {};
        _.each(elements[1].split("&"), function(param) {
          var nameValuePair;
          nameValuePair = param.split("=");
          return params[nameValuePair[0]] = nameValuePair[1];
        });
      }
      action = controller[path];
      if (action) {
        action(params);
      } else if (path !== "" && path !== "#") {
        alert("" + path + " not implemented");
      }
      return false;
    });
    $(document).on("click", function(event) {
      fimo.events.fire("click", event);
      return void 0;
    });
    return fimo.cache.clean();
  };

}).call(this);
