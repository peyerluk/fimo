@fimo.views.add "profile", ->
  
  template: _.template(
    """
    <div class="page">
      <h1><%= username %></h1>
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