(function() {

  this.fimo.controller = (function() {
    var $page, data, onPhotoDataFail, onPhotoDataSuccess, views;
    data = this.fimo.data;
    views = this.fimo.views;
    $page = $("#page");
    onPhotoDataFail = function() {
      return alert("could not get photo data");
    };
    onPhotoDataSuccess = function(imageURI) {
      return alert("retrieved photo data");
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
