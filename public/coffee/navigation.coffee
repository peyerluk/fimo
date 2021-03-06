@fimo.navigation = do ->
  
  $nav = $("#navbar")        
  
  jumbles = _.template(
    """
    <ul class="navbar-items">
      <li><a href="dashboard" class="btn btn-navbar"><i class="icon-align-justify"></i></a></li>
      <li><div id="navbar-title"><%= title %></div></li>
      <li class="navbar-right"><a href="newJumble" class="btn btn-navbar"><i class="icon-plus"></i></a></li>
    </ul>
    """
  );
  
  wall = _.template(
    """
    <ul class="navbar-items">
      <li><a href="<%= back %>" class="btn-back"><span>back</span></a></li>
      <li><div id="navbar-title" class="navbar-title-back"><%= title %></div></li>
      <li class="navbar-right"><a href="add?jumbleId=<%=jumbleId%>" class="btn btn-navbar"><i class="icon-plus"></i></a></li>
    </ul>
    """
  );
  
  back = _.template(
    """
    <ul class="navbar-items">
      <li><a href="<%= back %>" class="btn-back"><span>back</span></a></li>
      <li><div id="navbar-title" class="navbar-title-back"><%= title %></div></li>
    </ul>
    """
  );
  
  customBack = _.template(
    """
    <ul class="navbar-items">
      <li><a href="" class="btn-back" id="back"><span>back</span></a></li>
      <li><div id="navbar-title" class="navbar-title-back"><%= title %></div></li>
    </ul>
    """
  )
  
  fimo.events.on "afterPageLoaded", (viewName, viewArguments) ->
    title = $("#navbar-title").html()
    
    switch viewName
      when "jumbles"
        $nav.html(jumbles({ title: title })).show()
      when "wall", "wallByUsers"
        $nav.html(wall({ title: title, back: "jumbles", jumbleId: viewArguments['jumbleId'] })).show()
      when "object", "newObject"
        $nav.html(back({ title: title, back: "wall?jumbleId=#{viewArguments['jumbleId']}" })).show()
      when "login", "register"
        $nav.html(back({ title: title, back: "welcome" })).show()
      when "dashboard"
        $nav.html(back({ title: title, back: "jumbles" })).show()
      when "profile"
        $nav.html(back({ title: title, back: "dashboard" })).show()
      when "welcome"
        $nav.hide()
      when "newJumble", "jumbleObject", "jumblePeople"
        $nav.html(customBack({ title: title })).show()
      else
        $nav.html(back({ title: title, back: "back" })).show()
    
    