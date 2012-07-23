@fimo.data = do ->
  server = @fimo.hostname || "http://fimo.herokuapp.com"
  cache = fimo.cache
  
  load: (page, callback) ->
    
    if cached = cache.get(page)
      callback(cached)
    else
      $.ajax
        url: "#{ server }/#{ page }",
        dataType: "json"
        beforeSend: (xhr) ->
          xhr.withCredentials = true
        success: (data) ->
          
          # cache for x minutes
          if !/users\/profile/.test(page)
            cache.set(page, data, { secondsToLive: 10 * 60 })
          
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
      beforeSend: (xhr) ->
        xhr.withCredentials = true
      success: (data) ->
        callback(data) if callback
      error: (data, error, exception) ->
        console.log("error from ajax request: #{error}, #{exception}") if console
        errorCallback() if errorCallback