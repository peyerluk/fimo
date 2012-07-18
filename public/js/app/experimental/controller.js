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
      welcome: function() {
        return page.create(views.welcome(), {
          navbar: false
        });
      },
      jumbles: function() {
        return page.create(views.jumbles(), {
          title: "jumbles nearby"
        });
      },
      wall: function() {
        return fimo.data.load("wall", function(content) {
          return page.create(views.wall({
            images: content.images
          }));
        });
      },
      image: function(id) {
        return fimo.data.load("image?id=" + id, function(content) {
          return page.create(views.image({
            imageUrl: content.url
          }), {
            slideDirection: "right"
          });
        });
      },
      profile: function() {
        return fimo.data.load("users/profile", function(content) {
          return page.create(views.profile({
            username: content.username
          }));
        });
      },
      login: function() {
        return page.create(views.login(), {
          scroll: false,
          navbar: false
        });
      },
      add: function() {
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
    };
  })();

}).call(this);
