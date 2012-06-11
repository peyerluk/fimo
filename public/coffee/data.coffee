@fimo.data = do ->
  server = "http://localhost:3000"
  
  load: (page, callback) ->
    
    $.ajax
      url: "#{ server }/#{ page }",
      dataType: "jsonp"
      success: (data) ->
        console.log(data) if console
        callback(data)
        