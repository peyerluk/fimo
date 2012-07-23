(function() {

  this.fimo.user = (function() {
    /* PUBLIC
    */

    var loadUser;
    loadUser = function() {
      return JSON.parse(window.localStorage.getItem('user'));
    };
    return {
      init: function() {
        var user;
        user = loadUser();
        if (user) {
          return fimo.data.post('login', {
            'email': user.email,
            'password': user.password
          }, function() {
            return fimo.controller.jumbles();
          }, function() {
            console.log("automatic login unsuccessful.");
            return fimo.controller.welcome();
          });
        } else {
          return fimo.controller.welcome();
        }
      },
      getId: function() {
        var user;
        user = loadUser();
        return user.userId;
      },
      logout: function() {
        return window.localStorage.removeItem('user');
      }
    };
  })();

}).call(this);
