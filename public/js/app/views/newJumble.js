(function() {

  this.fimo.views.add("newJumble", function() {
    return {
      template: _.template("<form id=\"newJumbleForm\">\n  <label>Your jumble</label>\n  <input type=\"text\" name=\"name\" placeholder=\"Name your jumble\" id=\"name\" />\n  <legend>What's it about? (optional)</legend>\n  <input type=\"text\" name=\"tags\" placeholder=\"Add #tag\" id=\"tags\" />\n  <br/>\n  <button type=\"submit\" class=\"btn\">next step</button>\n</form>"),
      loaded: function() {
        var extendInstanceArguments,
          _this = this;
        extendInstanceArguments = function() {
          return _this.instanceArguments = _.extend(_this.instanceArguments, {
            jumbleName: $('#name').val(),
            jumbleTags: $('#tags').val()
          });
        };
        if (this.instanceArguments['jumbleName']) {
          $('input#name').val(this.instanceArguments['jumbleName']);
        }
        if (this.instanceArguments['jumbleTags']) {
          $('input#tags').val(this.instanceArguments['jumbleTags']);
        }
        return $('#newJumbleForm').submit(function() {
          extendInstanceArguments();
          fimo.controller['jumbleObject'](_this.instanceArguments);
          return false;
        });
      },
      destroy: function() {
        return console.log("destroyed jumbles#new}");
      }
    };
  });

}).call(this);
