(function() {

  this.fimo.views.add("newJumble", function() {
    return {
      template: _.template("<div class=\"page\" style=\"min-height:0px;\">\n  <form id=\"newJumbleForm\">\n    <div class=\"separator separator-1\"><em>Your Jumble</em></div>\n    <input type=\"text\" class=\"input-large\" name=\"name\" placeholder=\"Name your jumble\" id=\"name\" />\n    <div class=\"separator separator-2\"><em>What's it about?</em></div>\n    <input type=\"text\" class=\"input-large\" name=\"tags\" placeholder=\"first tag, second tag, etc.\" id=\"tags\" />\n    <br/>\n    <button type=\"submit\" class=\"btn btn-primary btn-right\">next step&nbsp;»</button>\n  </form>\n</div>"),
      loaded: function() {
        var extendInstanceArguments,
          _this = this;
        extendInstanceArguments = function() {
          return _this.instanceArguments = _.extend(_this.instanceArguments, {
            name: $('#name').val(),
            tags: $('#tags').val()
          });
        };
        if (this.instanceArguments['name']) {
          $('input#name').val(this.instanceArguments['name']);
        }
        if (this.instanceArguments['tags']) {
          $('input#tags').val(this.instanceArguments['tags']);
        }
        $('#newJumbleForm').submit(function() {
          extendInstanceArguments();
          fimo.controller['jumbleObject'](_this.instanceArguments);
          return false;
        });
        return $('#back').click(function() {
          fimo.controller['jumbles']();
          return false;
        });
      },
      destroy: function() {
        return console.log("destroyed jumbles#new}");
      }
    };
  });

}).call(this);
