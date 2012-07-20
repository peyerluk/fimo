@fimo.navigation = do ->
  
  # state: hidden, jumbles, jumble, view object, create jumble, create object
  
  $nav = $("#navbar")        
  
  jumbles = _.template(
    """
    <ul class="navbar-items">
      <li><a href="jumbles" class="btn btn-navbar"><i class="icon-align-justify"></i></a></li>
      <li><div id="navbar-title"><%= title %></div></li>
      <li class="navbar-right"><a href="addJumble" class="btn btn-navbar"><i class="icon-plus"></i></a></li>
    </ul>
    """
  );
  
  wall = _.template(
    """
    <ul class="navbar-items">
      <li><a href="<%= back %>" class="btn btn-navbar">back</a></li>
      <li><div id="navbar-title" class="navbar-title-back"><%= title %></div></li>
      <li class="navbar-right"><a href="add" class="btn btn-navbar"><i class="icon-plus"></i></a></li>
    </ul>
    """
  );
  
  back = _.template(
    """
    <ul class="navbar-items">
      <li><a href="<%= back %>" class="btn btn-navbar">back</a></li>
      <li><div id="navbar-title" class="navbar-title-back"><%= title %></div></li>
    </ul>
    """
  );
  
  fimo.events.on "afterPageLoaded", (viewName) ->
    console.log("afterPageLoaded: #{ viewName }")
    title = $("#navbar-title").html()
    console.log(title)
    
    switch viewName
      when "jumbles"
        $nav.html(jumbles({ title: title }))
      when "wall"
        $nav.html(wall({ title: title, back: "jumbles" }))
      when "image"
        $nav.html(back({ title: title, back: "wall" }))
      when "login", "register"
        $nav.html(back({ title: title, back: "welcome" }))
      else
        $nav.html(back({ title: title, back: "back" }))
    
    