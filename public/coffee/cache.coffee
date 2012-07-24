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
  
  remove: (key) ->
    store.remove(key)
  
  # remove expired cache entries
  clean: ->
    now = Date.now()
    everything = store.getAll()
    for key, entry of everything
      if /cache:/.exec(key)
        if entry.expires < now
          store.remove(key)
          console.log("removed: #{ key }")
        
    console.log("cache cleaned in #{ Date.now() - now }ms")
    undefined
  
  # remove all cache entries
  wipe: ->
    now = Date.now()
    everything = store.getAll()
    for key, entry of everything
      if /cache:/.exec(key)
        store.remove(key)
        
    console.log("cache wiped in #{ Date.now() - now }ms")
  
  
      