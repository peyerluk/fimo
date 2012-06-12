(function() {

  this.fimo.controller = (function() {
    var $page, data, onPhotoDataFail, onPhotoDataSuccess, onPhotoUploadFail, onPhotoUploadSuccess, views;
    data = this.fimo.data;
    views = this.fimo.views;
    $page = $("#page");
    onPhotoDataFail = function() {
      return alert("could not get photo data");
    };
    onPhotoUploadFail = function(error) {
      return alert("got error code on photo upload " + error.code);
    };
    onPhotoDataSuccess = function(imageURI) {
      var ft, options;
      alert("retrieved photo data");
      options = new FileUploadOptions();
      options.fileKey = "displayImage";
      options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
      options.mimeType = "image/jpeg";
      ft = new FileTransfer;
      return ft.upload(imageURI, "http://172.21.21.52:3000/upload", onPhotoUploadSuccess, onPhotoUploadFail, options);
    };
    onPhotoUploadSuccess = function(res) {
      return alert("got response code: " + res.repsonseCode);
    };
    return {
      wall: function() {
        return fimo.data.load("wall", function(page) {
          return $page.html(views.wall({
            images: page.images
          }));
        });
      },
      profile: function() {
        return fimo.data.load("profile", function(page) {
          return $page.html(views.profile({
            username: page.username
          }));
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
