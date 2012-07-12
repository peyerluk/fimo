(function() {

  this.fimo.user = (function() {
    var create_user;
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
    return {
      /* PUBLIC
      */

      init: function() {
        var user;
        user = store.get('user');
        if (user) {
          console.log('logging in existing user');
          return fimo.data.post('login', {
            'email': user.email,
            'password': user.password
          }, void 0, function() {
            return create_user();
          });
        } else {
          console.log('about to create user');
          return create_user();
        }
      }
    };
  })();

}).call(this);
