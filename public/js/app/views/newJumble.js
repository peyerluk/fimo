(function() {

  this.fimo.views.add("newJumble", function() {
    return {
      template: _.template("<form id=\"newJumbleForm\">\n  <label>Your jumble</label>\n  <input type=\"text\" name=\"name\" placeholder=\"Name your jumble\" id=\"name\" />\n  <legend>What's it about? (optional)</legend>\n  <input type=\"text\" name=\"tags\" placeholder=\"Add #tag\" id=\"tags\" />\n  <br/>\n  <button type=\"submit\" class=\"btn\">next step</button>\n</form>"),
      loaded: function() {
        var _this = this;
        if (this.instanceArguments['jumbleName']) {
          $('input#name').val(this.instanceArguments['jumbleName']);
        }
        if (this.instanceArguments['jumbleTags']) {
          $('input#tags').val(this.instanceArguments['jumbleTags']);
        }
        return $('#newJumbleForm').submit(function() {
          fimo.page.create(fimo.views.jumbleObject(_.extend(_this.instanceArguments, {
            jumbleName: $('input#name').val(),
            jumbleTags: $('input#tags').val()
          })));
          return false;
        });
      },
      destroy: function() {
        return console.log("destroyed jumbles#new}");
      }
    };
  });

}).call(this);
