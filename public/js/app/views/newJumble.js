(function() {

  this.fimo.views.add("newJumble", function() {
    return {
      template: _.template("<form id=\"newJumbleForm\">\n  <label>Your jumble</label>\n  <input type=\"text\" name=\"name\" placeholder=\"Name your jumble\" id=\"name\" />\n  <img src=\"http://upfront.io/assets/logo/logo-1.png\" id=\"previewImage\" style=\"display:none;\"/><br/>\n  <a href=\"\" id=\"imageLink\">Take an image</a><br/>\n  <legend>What's it about? (optional)</legend>\n  <input type=\"text\" name=\"tags\" placeholder=\"Add #tag\" id=\"tags\" />\n  <br/>\n  <button type=\"submit\" class=\"btn\">next step</button>\n</form>"),
      onPhotoUploadFail: function(error) {
        return alert("got error code on photo upload " + error.code);
      },
      onPhotoUploadSuccess: function(res) {
        var jsonResponse;
        alert(res.response);
        jsonResponse = JSON.parse(unescape(res.response));
        return $('#previewImage').show();
      },
      onPhotoDataSuccess: function(imageURI) {
        var ft, options;
        options = new FileUploadOptions();
        options.fileKey = "displayImage";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        ft = new FileTransfer;
        ft.upload(imageURI, "" + fimo.hostname + "/upload", this.onPhotoUploadSuccess, this.onPhotoUploadFail, options);
        return void 0;
      },
      onPhotoDataFail: function() {
        alert("failed");
        return false;
      },
      loaded: function() {
        var _this = this;
        return $('#imageLink').click(function() {
          fimo.device.ready(function() {
            navigator.camera.getPicture(_this.onPhotoDataSuccess, _this.onPhotoDataFail, {
              destinationType: Camera.DestinationType.FILE_URI,
              sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
              quality: 50
            });
            return false;
          });
          return false;
        });
      },
      destroy: function() {
        return console.log("destroyed jumbles#new}");
      }
    };
  });

}).call(this);
