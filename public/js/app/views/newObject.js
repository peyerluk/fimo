(function() {

  this.fimo.views.add("newObject", function() {
    return {
      template: _.template("<div style=\"min-height:500px;\">\n<form id=\"newObjectForm\">\n  <label>Your object</label>\n  <br/>\n  <img src=\"<%=imageUrl%>\" width=\"100\" height=\"100\" alt=\"preview\">\n  <br/>\n  <label>Why do you want to post this?</label>\n  <br/>\n  <select name=\"verbs\" multiple size=\"6\" id=\"verbs\">\n  	<option selected=\"true\">Give</option>\n  	<option>Swap</option>\n  	<option>Sell</option>\n  	<option>Like</option>\n  	<option>Want</option>\n  </select>\n  <br/>\n  <label>What is it? (optional)</label>\n  <br/>\n  <input type=\"text\" class=\"span3\" name=\"tags\" placeholder=\"Add #tag\" id=\"tags\" />\n  <br/>\n  <button type=\"submit\" class=\"btn\">jumble it</button>\n</form>\n</div>"),
      loaded: function() {
        var _this = this;
        return $('#newObjectForm').submit(function() {
          console.log("creating object...");
          fimo.data.post('objects/create', {
            imageId: _this.instanceArguments['imageId'],
            verbs: $('#verbs').val(),
            tags: $('#tags').val()
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
