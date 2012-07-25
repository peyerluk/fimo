(function() {

  this.fimo.controller = (function() {
    var data, hostname, onPhotoDataFail, onPhotoDataSuccess, onPhotoUploadFail, onPhotoUploadSuccess, page, views;
    data = this.fimo.data;
    views = this.fimo.views;
    page = this.fimo.page;
    hostname = this.fimo.hostname;
    onPhotoDataFail = function() {
      return alert("could not get photo data");
    };
    onPhotoUploadFail = function(error) {
      return alert("got error code on photo upload " + error.code);
    };
    onPhotoUploadSuccess = function(res) {
      var jsonResponse;
      jsonResponse = JSON.parse(unescape(res.response));
      return page.create(views.newObject({
        url: "" + hostname + "/objects/create",
        imageUrl: jsonResponse.imageUrl,
        imageId: jsonResponse.imageId
      }));
    };
    onPhotoDataSuccess = function(imageURI) {
      var ft, options;
      options = new FileUploadOptions();
      options.fileKey = "displayImage";
      options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
      options.mimeType = "image/jpeg";
      ft = new FileTransfer;
      ft.upload(imageURI, "" + hostname + "/upload", onPhotoUploadSuccess, onPhotoUploadFail, options);
      return void 0;
    };
    return {
      back: function() {
        var lastPage;
        lastPage = fimo.views.moveBack();
        if (lastPage && fimo.controller[lastPage]) {
          return fimo.controller[lastPage]();
        }
      },
      welcome: function() {
        return page.create(views.welcome(), {
          navbar: false
        });
      },
      jumbles: function() {
        return fimo.data.load("jumbles", function(content) {
          return page.create(views.jumbles({
            jumbles: content.jumbles
          }), {
            title: content.title,
            level: 2,
            scroll: true
          });
        });
      },
      wall: function(params) {
        return fimo.data.load("wall?jumble=" + params['jumbleId'], function(content) {
          return page.create(views.wall({
            objects: content.objects,
            jumbleId: params['jumbleId']
          }), {
            title: content.title,
            level: 3,
            scroll: true
          });
        });
      },
      object: function(params) {
        return fimo.data.load("objects/" + params['objectId'] + "/show", function(content) {
          return page.create(views.object({
            content: content
          }), {
            level: 4
          });
        });
      },
      newJumble: function(args) {
        return page.create(views.newJumble(args));
      },
      jumbleObject: function(args) {
        return page.create(views.jumbleObject(args));
      },
      jumblePeople: function(args) {
        return page.create(views.jumblePeople(args));
      },
      dashboard: function() {
        return page.create(views.dashboard(), {
          title: "Dashboard",
          level: 1
        });
      },
      profile: function() {
        var userId;
        userId = fimo.user.getId();
        return fimo.data.load("users/profile?userId=" + userId, function(content) {
          if (content.status === 200) {
            return page.create(views.profile({
              title: content.title,
              user: content.user,
              imageUrl: content.imageUrl
            }));
          } else {
            return page.create(views.message({
              message: content.message
            }));
          }
        });
      },
      login: function() {
        return page.create(views.login());
      },
      logout: function() {
        fimo.user.logout();
        return page.create(views.welcome());
      },
      register: function() {
        return page.create(views.register());
      },
      add: function(params) {
        if (fimo.device.isBrowser()) {
          return page.create(views.newObject({
            url: "" + hostname + "/objects/create",
            imageUrl: "http://fimo.s3.amazonaws.com/images/4fff0a2e0df2a02233000007_100x100.jpg",
            imageId: "4fff0a2e0df2a02233000007",
            jumbleId: params['jumbleId']
          }));
        } else {
          return fimo.device.ready(function() {
            var destinationType, pictureSource;
            pictureSource = Camera.PictureSourceType['PHOTOLIBRARY'];
            destinationType = Camera.DestinationType.FILE_URI;
            return navigator.camera.getPicture(onPhotoDataSuccess, onPhotoDataFail, {
              quality: 50,
              allowEdit: true,
              destinationType: destinationType,
              sourceType: pictureSource
            });
          });
        }
      }
    };
  })();

}).call(this);
