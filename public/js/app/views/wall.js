(function() {

  this.fimo.views.add("wall", function() {
    var imageIdRegex;
    imageIdRegex = /\w*(?=_\w*\.(?=jpg|png))/i;
    return {
      template: _.template("<ul id=\"wall\" class=\"clearfix\">\n<% _.each(objects, function(object) { %>\n  <li><img src='<%= object.url %>' data-object=\"<%= object.objectId %>\" width=\"100\" height=\"100\"></li> \n<% }); %>\n</ul>"),
      click: function(event) {
        var objectId;
        objectId = event.target.getAttribute("data-object");
        if (objectId) {
          return fimo.controller.object(objectId);
        }
      },
      loaded: function() {
        return fimo.events.on("click", this.click);
      },
      destroy: function() {
        return fimo.events.off("click", this.click);
      }
    };
  });

}).call(this);
