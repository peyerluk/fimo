(function() {

  this.fimo.views.add("wall", function() {
    var imageIdRegex;
    imageIdRegex = /\w*(?=_\w*\.(?=jpg|png))/i;
    return {
      template: _.template("<ul id=\"wall\" class=\"clearfix\">\n<% _.each(images, function(image) { %>\n  <li><img src='<%= image %>' width=\"100\" height=\"100\"></li> \n<% }); %>\n</ul>"),
      click: function(event) {
        var imageSrc, result;
        console.log("clicked in wall");
        imageSrc = event.target.getAttribute("src");
        if (imageSrc) {
          result = imageIdRegex.exec(imageSrc);
          if (result) {
            return fimo.controller.image(result[0]);
          }
        }
      },
      loaded: function() {
        return fimo.events.on("click", this.click);
      },
      destroy: function() {
        fimo.events.off("click", this.click);
        return console.log("destroyed wall");
      }
    };
  });

}).call(this);
