(function() {

  fimo.formatTagStrings = function(text) {
    return _.reduce(text.split(" "), function(formatedText, word) {
      if (word.charAt(0) === "#") {
        return formatedText + "&nbsp;<a href=''><em>" + word + "</em></a>";
      } else {
        return formatedText + " " + word;
      }
    });
  };

}).call(this);
