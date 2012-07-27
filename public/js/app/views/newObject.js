(function() {

  this.fimo.views.add("newObject", function() {
    return {
      template: _.template("<div class=\"page\" style=\"min-height:0px;\">\n<form id=\"newObjectForm\">\n  <div class=\"separator separator-1\"><em>Your object</em></div>\n  <img src=\"<%= imageUrl %>\" class=\"preview\" width=\"100\" height=\"100\" alt=\"preview\">\n  <br/>\n  \n  <div class=\"separator separator-4\"><em>Why do you want to post this?</em></div>\n    \n  <div class=\"newObject-verbs clearfix\" style=\"margin-top:15px;\">\n    <span>Pass it on</span>\n    <a href=\"\" class=\"btn\" data-verb=\"give\"><i class=\"icon icon-star\"></i>Give</a>\n    <a href=\"\" class=\"btn\" data-verb=\"swap\"><i class=\"icon icon-star\"></i>Swap</a>\n    <a href=\"\" class=\"btn\" data-verb=\"sell\"><i class=\"icon icon-star\"></i>Sell</a>\n  </div>\n  <div class=\"newObject-verbs clearfix\">\n    <span>Show it</span>\n    <a href=\"\" class=\"btn btn-verb-large\" data-verb=\"like\"><i class=\"icon icon-star\"></i>Like</a>\n    <a href=\"\" class=\"btn btn-verb-large\" data-verb=\"want\"><i class=\"icon icon-star\"></i>Want</a>\n  </div>\n  <br/>\n  \n  <div class=\"separator separator-2\"><em>What is it? (optional)</em></div>\n  <input type=\"text\" class=\"input-large\" name=\"tags\" placeholder=\"tag, second tag, another tag\" id=\"tags\" />\n  <br/>\n  \n  <button type=\"submit\" class=\"btn btn-primary btn-form-large\">jumble it</button>\n</form>\n</div>"),
      loaded: function() {
        var verbs,
          _this = this;
        verbs = {};
        $(".newObject-verbs").on("click", "a", function(event) {
          var $this;
          $this = $(this);
          $this.toggleClass("btn-info");
          $this.find("i").toggleClass("icon-white");
          return verbs[$this.data("verb")] = !verbs[$this.data("verb")];
        });
        return $('#newObjectForm').submit(function() {
          var key, tags, value;
          console.log("creating object...");
          verbs = (function() {
            var _results;
            _results = [];
            for (key in verbs) {
              value = verbs[key];
              if (value === true) {
                _results.push(key);
              }
            }
            return _results;
          })();
          tags = _.map($('#tags').val().split(","), function(tag) {
            return $.trim(tag).toLowerCase();
          });
          fimo.data.post('objects/create', {
            imageId: _this.instanceArguments['imageId'],
            jumble: _this.instanceArguments['jumbleId'],
            verbs: verbs,
            tags: tags
          }, function(data) {
            fimo.cache.remove("jumbles/" + data.jumbleId + "/wall-by-users");
            return fimo.controller.object({
              objectId: data.objectId,
              jumbleId: data.jumbleId
            });
          }, function() {
            return false;
          });
          return false;
        });
      },
      destroy: function() {
        return console.log("destroyed objects#new}");
      }
    };
  });

}).call(this);
