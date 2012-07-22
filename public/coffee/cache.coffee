fimo.cache = do ->
  
  # default time to live in seconds
  defaultToLive = ->
    # 60 minutes * 60 seconds
    60 * 60
    
  get: (key) ->
    key = "cache:#{ key }"
    
    entry = store.get(key)
    if entry && entry.expires > Date.now()
      
      # fresh
      entry.data
      
    else if entry
      
      # entry is expired
      console.log("cache expired: #{ key }")
      store.remove(key)
      undefined
      
    else
      undefined
      
    
  
  set: (key, data, { secondsToLive, persistent }) ->
    key = "cache:#{ key }"
    
    secondsToLive ?= defaultToLive()
    entry = {}
    
    milisecondsToLive = secondsToLive * 1000
    entry.expires = Date.now() + milisecondsToLive
    entry.data = data
    
    store.set(key, entry)
  
  delete: (key) ->
    storedEntries -= 1
    
  clean: ->
    everything = store.getAll()
    now = Date.now()
    for key, entry of everything
      if /cache:/.exec(key)
        if entry.expires < now
          store.remove(key)
          console.log("removed: #{ key }")
        
    console.log("cache cleaned in #{ Date.now() - now }ms")
    undefined
  
  
      