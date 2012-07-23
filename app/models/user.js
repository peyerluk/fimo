var Schema, User, UserModel, mongoose, mongooseAuth;

mongoose = require("../config/mongodb");

mongooseAuth = require('mongoose-auth');

Schema = mongoose.Schema;

User = new Schema({
  username: {
    type: String
  },
  name: {
    prename: String,
    surname: String
  },
  coords: {
    lon: Number,
    lat: Number
  },
  location: {
    country: String,
    region: String,
    city: String,
    address: Schema.Types.Mixed
  },
  created: {
    type: Date,
    "default": Date.now
  }
});

User.plugin(mongooseAuth, {
  everymodule: {
    everyauth: {
      User: function() {
        return UserModel;
      }
    }
  },
  password: {
    loginWith: 'email',
    everyauth: {
      getLoginPath: '/login',
      postLoginPath: '/login',
      loginView: 'login.jade',
      getRegisterPath: '/register',
      postRegisterPath: '/register',
      registerView: 'register.jade',
      loginSuccessRedirect: '/',
      registerSuccessRedirect: '/',
      respondToRegistrationSucceed: function(res, user) {
        console.log("registration successful");
        if (res.req.header('accept') === 'application/json') {
          console.log("from xhr");
          return res.json({
            success: true
          }, 200);
        } else {
          console.log("from http");
          return res.redirect("/");
        }
      },
      respondToRegistrationFail: function(req, res, errors, login) {
        console.log("registration failed");
        if (req.header('accept') === 'application/json') {
          console.log("..from xhr");
          return res.json({
            success: false
          }, 500);
        } else {
          console.log("..from http");
          return res.redirect("/register");
        }
      },
      respondToLoginFail: function(req, res, errors, login) {
        if (!errors || !errors.length) {
          return;
        }
        console.log("login failed");
        if (req.header('accept') === 'application/json') {
          console.log(errors);
          console.log("..from xhr");
          return res.json({
            success: false
          }, 403);
        } else {
          console.log("..from http");
          return res.redirect("/login");
        }
      },
      respondToLoginSucceed: function(res, user) {
        if (user) {
          console.log("login succeeded");
          if (res.req.header('accept') === 'application/json') {
            console.log("..from xhr");
            return res.json({
              success: true,
              userId: user._id
            }, 200);
          } else {
            console.log("..from http");
            return res.redirect("/");
          }
        }
      }
    }
  }
});

User.index({
  coords: "2d"
});

UserModel = mongoose.model('User', User);

module.exports = UserModel;
