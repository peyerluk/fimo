(function() {

  this.fimo.views.add("newObject", function() {
    return {
      template: _.template("<div class=\"page\" style=\"min-height:0px;\">\n<form id=\"newObjectForm\"s>\n  <div class=\"separator separator-1\"><em>Your object</em></div>\n  <img src=\"<%=imageUrl%>\" class=\"preview\" width=\"100\" height=\"100\" alt=\"preview\">\n  <br/>\n  \n  <div class=\"separator separator-4\"><em>Why do you want to post this?</em></div>\n    \n  <div class=\"object-verbs clearfix\" style=\"margin-top:15px;\">\n    <span>Pass it on</span>\n    <a href=\"\" class=\"btn\"><i class=\"icon icon-star\"></i>Give</a>\n    <a href=\"\" class=\"btn\"><i class=\"icon icon-star\"></i>Swap</a>\n    <a href=\"\" class=\"btn\"><i class=\"icon icon-star\"></i>Sell</a>\n  </div>\n  <div class=\"object-verbs clearfix\">\n    <span>Show it</span>\n    <a href=\"\" class=\"btn btn-verb-large\"><i class=\"icon icon-star\"></i>Like</a>\n    <a href=\"\" class=\"btn btn-verb-large\"><i class=\"icon icon-star\"></i>Want</a>\n  </div>\n  <br/>\n  \n  <div class=\"separator separator-2\"><em>What is it? (optional)</em></div>\n  <input type=\"text\" class=\"input-large\" name=\"tags\" placeholder=\"Add #tag\" id=\"tags\" />\n  <br/>\n  \n  <button type=\"submit\" class=\"btn btn-primary btn-form-large\">jumble it</button>\n</form>\n</div>"),
      loaded: function() {
        var _this = this;
        return $('#newObjectForm').submit(function() {
          var tags;
          console.log("creating object...");
          tags = $('#tags').val().split(",");
          fimo.data.post('objects/create', {
            imageId: _this.instanceArguments['imageId'],
            verbs: $('#verbs').val(),
            tags: tags
          }, function() {
            return fimo.controller.jumbles();
          }, function() {
            return $('.alert-error').show();
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
