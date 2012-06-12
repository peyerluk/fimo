eventSplitter = /\s+/

# A module that can be mixed in to *any object* in order to provide it with
# custom events. You may bind with `on` or remove with `off` callback functions
# to an event; trigger`-ing an event fires all callbacks in succession.
#
#     var object = {};
#     _.extend(object, Backbone.Events);
#     object.on('expand', function(){ alert('expanded'); });
#     object.trigger('expand');
#
@fimo.events = {

  # Bind one or more space separated events, `events`, to a `callback`
  # function. Passing `"all"` will bind the callback to all events fired.
  on: (events, callback, context) -> 
    
    if !callback
      return this
      
    events = events.split(eventSplitter)
    calls = this._callbacks || (this._callbacks = {})

    # Create an immutable callback list, allowing traversal during
    # modification.  The tail is an empty object that will always be used
    # as the next node.
    while event = events.shift()
      list = calls[event]
      node = if list then list.tail else {}
      node.next = tail = {}
      node.context = context
      node.callback = callback
      calls[event] = 
        tail: tail
        next: if list then list.next else node

    this

  # Remove one or many callbacks. If `context` is null, removes all callbacks
  # with that function. If `callback` is null, removes all callbacks for the
  # event. If `events` is null, removes all bound callbacks for all events.
  off: (events, callback, context) ->

    # No events, or removing *all* events.
    if !(calls = this._callbacks)
      return
      
    if !(events || callback || context)
      delete this._callbacks;
      return this;
    

    # Loop through the listed events and contexts, splicing them out of the
    # linked list of callbacks if appropriate.
    events = if events then events.split(eventSplitter) else _.keys(calls)
    while event = events.shift()
      node = calls[event]
      delete calls[event]
      
      if !node || !(callback || context) 
        continue
        
      # Create a new list, omitting the indicated callbacks.#
      tail = node.tail
      
      while (node = node.next) != tail 
        cb = node.callback
        ctx = node.context
        if (callback && cb != callback) || (context && ctx != context)
          this.on(event, cb, ctx)

    this

  # Trigger one or many events, firing all bound callbacks. Callbacks are
  # passed the same arguments as `trigger` is, apart from the event name
  # (unless you're listening on `"all"`, which will cause your callback to
  # receive the true name of the event as the first argument).
  trigger: (events) ->
    
    if !(calls = this._callbacks)
      return this
      
    all = calls.all
    events = events.split(eventSplitter)
    rest = slice.call(arguments, 1)

    # For each event, walk through the linked list of callbacks twice,
    # first to trigger the event, then to trigger any `"all"` callbacks.
    while event = events.shift()
      if node = calls[event]
        tail = node.tail
        while (node = node.next) != tail
          node.callback.apply(node.context || this, rest)
      
      if node = all
        tail = node.tail
        args = [event].concat(rest)
        while (node = node.next) != tail
          node.callback.apply(node.context || this, args)

    this

}