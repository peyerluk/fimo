(function() {

  this.fimo.views.add("login", function() {
    return {
      template: _.template("<div class=\"narrow\">\n  <div class=\"handwriting handwriting-login\">\n    good to have you back!\n  </div>\n  \n  <div class=\"alert alert-error\" style=\"display:none\">\n    Die E-Mail Adresse oder das Passwort stimmt nicht.\n  </div>  \n  <form class=\"login\" id=\"loginForm\">\n    <input type=\"email\" placeholder=\"email\" name=\"email\" id=\"email\"}>\n    <input type=\"password\" placeholder=\"password\" name=\"password\" id=\"password\">\n    <br>\n    <button class=\"btn btn-form btn-primary\" type=\"submit\">login</button>\n  </form>\n\n</div>"),
      click: function(event) {
        return console.log("clicked in login");
      },
      loaded: function() {
        fimo.events.on("click", this.click);
        return $('#loginForm').submit(function() {
          var email, password;
          email = $('input#email').val();
          password = $('input#password').val();
          fimo.data.post('login', {
            email: email,
            password: password
          }, function(res) {
            window.localStorage.setItem('user', JSON.stringify({
              email: email,
              password: password,
              userId: res.userId
            }));
            return fimo.controller.jumbles();
          }, function() {
            return $('.alert-error').show();
          });
          return false;
        });
      },
      destroy: function() {
        return fimo.events.off("click", this.click);
      }
    };
  });

}).call(this);
