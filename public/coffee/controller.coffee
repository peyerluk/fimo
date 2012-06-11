@fimo.controller = do ->
  data = @fimo.data
  views = @fimo.views
  $page = $("#page")
  
  wall: ->
    fimo.data.load "wall", (page) ->
      $page.html(views.wall({ images : page.images }))
  
  profile: ->
    fimo.data.load "profile", (page) ->
      $page.html(views.profile({ username : page.username }))