@fimo.views.add "dashboard", ->
  
  template: _.template(
    """
    <div>
      <ul class="dashboard">
        <li class="dashboard-title">Jumbles</li>
        <li><a href="jumbles">Jumbles nearby</a></li>
        <li><a href="jumbles">My jumbles</a></li>
        <li class="dashboard-title">User</li>
        <li><a href="profile">Profile</a></li>
        <li><a href="logout">Logout</a></li>
      </ul>
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