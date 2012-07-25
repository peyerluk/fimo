(function() {

  this.fimo.views.add("jumbleObject", function() {
    return {
      template: _.template("<div class=\"page\" style=\"min-height:0px;\">\n<form id=\"jumbleObjectForm\">\n  <div class=\"handwriting\">\n    What's the first thing you want to post in your jumble?\n  </div>\n  <img src=\"\" id=\"previewImage\" style=\"display:none;\"/><br/>\n  <a href=\"\" id=\"imageLink\">Take an image</a><br/>\n  \n  <div class=\"separator separator-4\"><em>Why do you want to post this?</em></div>\n    \n  <div class=\"newObject-verbs clearfix\" style=\"margin-top:15px;\">\n    <span>Pass it on</span>\n    <a href=\"\" class=\"btn\" data-verb=\"give\"><i class=\"icon icon-star\"></i>Give</a>\n    <a href=\"\" class=\"btn\" data-verb=\"swap\"><i class=\"icon icon-star\"></i>Swap</a>\n    <a href=\"\" class=\"btn\" data-verb=\"sell\"><i class=\"icon icon-star\"></i>Sell</a>\n  </div>\n  <div class=\"newObject-verbs clearfix\">\n    <span>Show it</span>\n    <a href=\"\" class=\"btn btn-verb-large\" data-verb=\"like\"><i class=\"icon icon-star\"></i>Like</a>\n    <a href=\"\" class=\"btn btn-verb-large\" data-verb=\"want\"><i class=\"icon icon-star\"></i>Want</a>\n  </div>\n  <div class=\"separator separator-2\"><em>What is it?</em></div>\n  <input type=\"text\" class=\"input-large\" name=\"tags\" placeholder=\"first tag, second tag, etc.\" id=\"tags\" />\n  <button type=\"submit\" class=\"btn btn-primary btn-right\">next step&nbsp;»</button>\n</form>\n</div>"),
      onPhotoUploadFail: function(error) {
        return alert("got an upload error: " + error.code);
      },
      onPhotoUploadSuccess: function(res) {
        var jsonResponse;
        jsonResponse = JSON.parse(unescape(res.response));
        $('#previewImage').attr("src", function() {
          return jsonResponse.imageUrl;
        });
        $('#previewImage').show();
        this.instanceArguments['primaryObject']['imageUrl'] = jsonResponse.imageUrl;
        return this.instanceArguments['primaryObject']['imageId'] = jsonResponse.imageId;
      },
      onPhotoDataSuccess: function(imageURI) {
        var ft, options;
        options = new FileUploadOptions();
        options.fileKey = "displayImage";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        ft = new FileTransfer();
        ft.upload(imageURI, "" + fimo.hostname + "/upload", _.bind(this.onPhotoUploadSuccess, this), _.bind(this.onPhotoUploadFail, this), options);
        return void 0;
      },
      onPhotoDataFail: function() {
        alert("failed");
        return false;
      },
      loaded: function() {
        var extendInstanceArguments, readVerbs,
          _this = this;
        if (!this.instanceArguments['primaryObject']) {
          this.instanceArguments['primaryObject'] = {};
        }
        if (!this.instanceArguments['primaryObject']['verbs']) {
          this.instanceArguments['primaryObject']['verbs'] = [];
        }
        console.log(this.instanceArguments['primaryObject']['verbs']);
        readVerbs = function($elem) {
          $elem.toggleClass("btn-info");
          $elem.find("i").toggleClass("icon-white");
          if (_.find(_this.instanceArguments['primaryObject']['verbs'], function(verb) {
            return $elem.data("verb") === verb;
          })) {
            _this.instanceArguments['primaryObject']['verbs'] = _.without(_this.instanceArguments['primaryObject']['verbs'], $elem.data("verb"));
          } else {
            _this.instanceArguments['primaryObject']['verbs'].push($elem.data("verb"));
          }
          return false;
        };
        extendInstanceArguments = function() {
          _this.instanceArguments['primaryObject']['tags'] = $("#tags").val();
          return false;
        };
        if (this.instanceArguments['primaryObject']['tags']) {
          $('#tags').val(this.instanceArguments['primaryObject']['tags']);
        }
        _.each(this.instanceArguments['primaryObject']['verbs'], function(verb) {
          var $elem;
          $elem = $("[data-verb=" + verb + "]");
          $elem.toggleClass("btn-info");
          return $elem.find("i").toggleClass("icon-white");
        });
        if (this.instanceArguments['primaryObject']['imageUrl']) {
          $('#previewImage').attr('src', function() {
            return _this.instanceArguments['primaryObject']['imageUrl'];
          });
          $('#previewImage').show();
        }
        $(".newObject-verbs").on("click", "a", function(event) {
          return readVerbs($(this));
        });
        $('#imageLink').click(function() {
          if (fimo.device.getAgent() === "browser") {
            return _this.onPhotoUploadSuccess({
              "response": JSON.stringify({
                "imageUrl": "http://fimo.s3.amazonaws.com/images/4fff0a2e0df2a02233000007_100x100.jpg",
                imageId: "4fff0a2e0df2a02233000007"
              })
            });
          } else {
            fimo.device.ready(function() {
              navigator.camera.getPicture(_.bind(_this.onPhotoDataSuccess, _this), _.bind(_this.onPhotoDataFail, _this), {
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                quality: 50
              });
              return false;
            });
            return false;
          }
        });
        $('#jumbleObjectForm').submit(function() {
          extendInstanceArguments();
          fimo.controller['jumblePeople'](_this.instanceArguments);
          return false;
        });
        return $('#back').click(function() {
          extendInstanceArguments();
          fimo.controller['newJumble'](_this.instanceArguments);
          return false;
        });
      },
      destroy: function() {
        return console.log("destroyed jumbles#object}");
      }
    };
  });

}).call(this);
