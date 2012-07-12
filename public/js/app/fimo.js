
/* NAMCESPACES
*/


(function() {
  var fimo;

  this.fimo = {};

  fimo = this.fimo;

  /* FIMO INITIALIZATION
  */


  fimo.init = function() {
    var controller, imageIdRegex;
    controller = fimo.controller;
    fimo.user.init();
    $(document).on("click", "a", function(event) {
      var action, path;
      event.preventDefault();
      path = this.getAttribute("href");
      action = controller[path];
      if (action) {
        action();
      } else {
        alert("" + path + " not implemented");
      }
      return void 0;
    });
    imageIdRegex = /\w*(?=_\w*\.(?=jpg|png))/i;
    return $(document).on("click", function(event) {
      var imageSrc, result;
      imageSrc = event.target.getAttribute("src");
      if (imageSrc) {
        result = imageIdRegex.exec(imageSrc);
        if (result) {
          return controller.image(result[0]);
        }
      }
    });
  };

}).call(this);
