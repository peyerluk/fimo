(function() {

  this.fimo.views.add("register", function() {
    return {
      template: _.template("<div class=\"narrow\">\n  <div class=\"handwriting handwriting-login\">\n    Get started!\n  </div>\n\n  <div class=\"alert alert-error\" style=\"display:none\">\n    Die Registrierung war nicht erfolgreich.\n  </div>\n  <form id=\"registerForm\">\n    <input type=\"text\" placeholder=\"full name\" name=\"name\", id=\"name\">\n    <input type=\"email\" placeholder=\"email\" name=\"email\", id=\"email\">\n    <input type=\"password\" placeholder=\"password\" name=\"password\", id=\"password\">\n    <br>\n    <button class=\"btn btn-form btn-primary\" type=\"submit\">register</button>\n  </form>\n\n</div>"),
      loaded: function() {
        return $('#registerForm').submit(function() {
          console.log("registering in on login form...");
          fimo.data.post('register', {
            email: $('input#email').val(),
            username: $('input#name').val(),
            password: $('input#password').val()
          }, function() {
            window.localStorage.setItem('user', JSON.stringify({
              email: $('input#email').val(),
              password: $('input#password').val()
            }));
            return fimo.controller.jumbles();
          }, function() {
            return $('.alert-error').show();
          });
          return false;
        });
      },
      destroy: function() {
        return console.log("destroyed login");
      }
    };
  });

}).call(this);
