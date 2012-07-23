@fimo.views.add "jumblePeople", ->
  
  template: _.template(
    """
    <p>Who would like this jumble? Invite at least 5 friends to get started, because jumblin alone ain't no fun.</p>
    <form id="jumblePeopleForm">
      <label>Invite your friends</label>
      <a href="" id="friendsLink">Select from your contacts</a><br/>
      <select name="friends" multiple size="6" id="friends" style="display:none;">
      </select>
      <label>Add a personal message (optional)</label>
      <br/>
      <input type="text" name="message" id="message" placeholder="Hi! I just started a new jumble. Have a look. http://jum.bl/<%=name%>" />
      <br/>
      <button type="submit" class="btn">submit</button>
    </form>
    """
  )
  
  onContactsSuccess: (contacts) ->
    @populateFriends(contacts)

  onContactsError: (contactError) ->
    alert("error: #{contactError}")
    
  populateFriends: (friends) ->
    for friend in friends
      # if @instanceArguments['jumbleSelectedFriends']
      # TODO: see if in selected friends and pre-select if so
      # TODO: don't show pre or surname if it is null
      $('#friends').append("<option value='name'>#{friend.name.givenName} #{friend.name.familyName}</option>")
      $('#friends').show()
  
  loaded: ->
    
    # init empty
    if !@instanceArguments['invitation']
      @instanceArguments['invitation'] = {}
    
    
    extendInstanceArguments = =>
      @instanceArguments = _.extend(@instanceArguments, { invitation: { jumbleFriendsMessage: $('#message').val(), jumbleSelectedFriends: $('#friends').val() } })
    
    if @instanceArguments['invitation']['jumbleFriendsMessage']
      $('#message').val(@instanceArguments['jumbleFriendsMessage'])
    
    $('#friendsLink').click =>
      if fimo.device.isBrowser() #fimo.device.getAgent() == "browser"
        @populateFriends([{ name: { givenName: "Lukas", familyName: "Peyer" } }, { name: { givenName: "Gabriel", familyName: "Hase" } }])
      else
        fimo.device.ready =>    
          options = new ContactFindOptions()
          options.filter = ""
          options.multiple = true 
          fields = ["displayName", "name", "emails", "phoneNumbers"];
          navigator.contacts.find(fields, _.bind(@onContactsSuccess, @), _.bind(@onContactsError, @), options);
          false
        false        
    
    $('#jumbleObjectForm').submit =>
      console.log "creating jumble..."
      fimo.data.post 'jumbles/create', @instanceArguments, =>
        # TODO: route to jumble view
        fimo.controller.jumbles()
      , ->
        alert("error")
        #$('.alert-error').show()
      false
      
    $('#back').click =>
      extendInstanceArguments()
      fimo.controller['jumbleObject']( @instanceArguments )
      #fimo.page.create( fimo.views.jumbleObject( @instanceArguments ) )  
      false
      
  destroy: ->
    console.log("destroyed jumbles#object}")