
/* NAMCESPACES
*/


(function() {
  var fimo;

  this.fimo = {};

  fimo = this.fimo;

  /* FIMO INITIALIZATION
  */


  fimo.init = function() {
    var controller, create_user, imageIdRegex, user;
    controller = fimo.controller;
    create_user = function() {
      var pretty_unique_name;
      pretty_unique_name = "" + (Math.random().toString(32));
      return fimo.data.post('register', {
        email: "" + pretty_unique_name + "@fimo.com",
        username: "" + pretty_unique_name,
        password: "notsosecure"
      }, function() {
        return fimo.data.post('login', {
          email: "" + pretty_unique_name + "@fimo.com",
          password: 'notsosecure'
        }, function() {
          return store.set('user', {
            email: "" + pretty_unique_name + "@fimo.com",
            password: 'notsosecure'
          });
        });
      });
    };
    user = store.get('user');
    if (user) {
      console.log('logging in existing user');
      fimo.data.post('login', {
        'email': user.email,
        'password': user.password
      }, void 0, function() {
        return create_user();
      });
    } else {
      console.log('about to create user');
      create_user();
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
