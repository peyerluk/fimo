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
    everyauth: {
      getLoginPath: '/login',
      postLoginPath: '/login',
      loginView: 'login.jade',
      getRegisterPath: '/register',
      postRegisterPath: '/register',
      registerView: 'register.jade',
      loginSuccessRedirect: '/',
      registerSuccessRedirect: '/'
    }
  },
  facebook: {
    everyauth: {
      myHostname: 'http://localhost:3000',
      appId: 'YOUR APP ID HERE',
      appSecret: 'YOUR APP SECRET HERE',
      redirectPath: '/'
    }
  }
});

User.index({
  coords: "2d"
});

UserModel = mongoose.model('User', User);

module.exports = UserModel;
