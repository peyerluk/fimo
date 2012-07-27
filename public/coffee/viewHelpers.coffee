fimo.formatTagStrings = (text) ->
  _.reduce(text.split(" "), (formatedText, word) ->
    if word.charAt(0) == "#"
      return formatedText + "&nbsp;<a href=''><em>" + word + "</em></a>"
    else
      return formatedText + " " + word
      )