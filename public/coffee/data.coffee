@fimo.data = do ->
  server = "http://172.21.21.52:3000"
  #server = "http://172.21.21.150:3000"
  
  load: (page, callback) ->
    
    $.ajax
      url: "#{ server }/#{ page }",
      dataType: "jsonp"
      success: (data) ->
        console.log(data) if console
        callback(data)
        
  post: (page, data, callback, errorCallback) ->
    console.log("posting to #{server}/#{page}")
    $.ajax
      type: 'POST',
      url:  "#{ server }/#{ page }",
      dataType: "json",
      data: data
      success: (data) ->
        callback(data)
      error: (data, error, exception) ->
        console.log("error from ajax request: #{error}, #{exception}") if console
        errorCallback() if errorCallback