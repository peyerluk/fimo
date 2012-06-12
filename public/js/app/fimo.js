
/* NAMCESPACES
*/


(function() {
  var fimo;

  this.fimo = {};

  fimo = this.fimo;

  /* FIMO INITIALIZATION
  */


  fimo.init = function() {
    var controller, scrollable;
    controller = fimo.controller;
    if (store.get('user')) {

    } else {

    }
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
    $(document.body).on('touchmove', function(event) {
      return event.preventDefault();
    }, false);
    console.log($("#page")[0]);
    return scrollable = new fimo.Scroller($("#page")[0]);
  };

}).call(this);
