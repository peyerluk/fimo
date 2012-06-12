@fimo.data = do ->
  server = "http://172.21.21.52:3000"
  # server = "http://172.21.21.150:3000"
  
  load: (page, callback) ->
    
    $.ajax
      url: "#{ server }/#{ page }",
      dataType: "jsonp"
      success: (data) ->
        console.log(data) if console
        callback(data)
        