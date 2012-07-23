@fimo.views.add "profile", ->
  
  template: _.template(
    """
    <div class="page">
      <h1><%= user.username %></h1>
      <h3>Email: <%= user.email %></h3>
    </div>
    """
  )
  
  click: (event) ->
    # todo
    true
    
    
  loaded: ->
    fimo.events.on "click", this.click
  
  destroy: ->
    fimo.events.off "click", this.click