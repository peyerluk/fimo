
### NAMCESPACES ###
@fimo = {}
fimo = @fimo

### FIMO INITIALIZATION ###
fimo.init = ->
  controller = fimo.controller
  
  # authentication
  create_user = () ->
    # create user
    # TODO: add in coordinates
    pretty_unique_name = "#{Math.random().toString(32)}"
    fimo.data.post 'register', {email:"#{pretty_unique_name}@fimo.com", username:"#{pretty_unique_name}", password:"notsosecure"}, ->
      # login user
      fimo.data.post 'login', {email:"#{pretty_unique_name}@fimo.com", password:'notsosecure'}, ->
        # store user to local store
        store.set('user', {email:"#{pretty_unique_name}@fimo.com", password:'notsosecure'})

  user = store.get('user')
  if user
    # login user
    console.log('logging in existing user')
    fimo.data.post 'login', {'email':user.email, 'password': user.password}, undefined, ->
      create_user()
  else
    console.log('about to create user')
    create_user()

  
  # navigation
  $(document).on "click", "a", (event) ->
    event.preventDefault()
    
    path = this.getAttribute("href")
    action = controller[path]
    if action
      action()
    else
      alert("#{ path } not implemented")
  
    undefined
    
  # prevent native scrolling
  $(document.body).on('touchmove', (event) ->
    # This prevents native scrolling from happening.
    event.preventDefault()
  , false)
  
  console.log($("#page")[0])
  scrollable = new fimo.Scroller($("#page")[0])