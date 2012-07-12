@fimo.data = do ->
  server = @fimo.hostname || "http://fimo.herokuapp.com"
  
  load: (page, callback) ->
    
    $.ajax
      url: "#{ server }/#{ page }",
      dataType: "json"
      success: (data) ->
        console.log(data) if console
        callback(data)
      error: (jqXHR, error) ->
        console.log(error)
        
        
  post: (page, data, callback, errorCallback) ->
    console.log("posting to #{server}/#{page}")
    $.ajax
      type: 'POST',
      url:  "#{ server }/#{ page }",
      dataType: "json",
      data: data
      success: (data) ->
        callback(data) if callback
      error: (data, error, exception) ->
        console.log("error from ajax request: #{error}, #{exception}") if console
        errorCallback() if errorCallback