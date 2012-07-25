@fimo.views.add "jumblePeople", ->
  
  template: _.template(
    """
    <div class="page" style="min-height:0px;">
    <form id="jumblePeopleForm">
      <div class="handwriting">
        Who would like this jumble? Invite at least 5 friends to get started, because jumblin alone ain't no fun.
      </div>
      <div class="separator separator-3"><em>Invite your friends</em></div>
      <a href="" id="friendsLink">Select from your contacts</a><br/>
      <select name="friends" multiple size="6" id="friends" style="display:none;">
      </select>
      <div class="separator separator-4"><em>Add a personal message (optional)</em></div>
      <textarea name="message" class="input-large" id="message" placeholder="Hi! I just started a new jumble. Have a look. http://jum.bl/<%=name%>">
      </textarea>
      <button type="submit" class="btn btn-primary btn-form-large">publish your jumble</button>
    </form>
    </div>
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
    
    $('#jumblePeopleForm').submit (event) =>
      event.preventDefault()
      console.log "creating jumble..."
      # pre-conditioning
      @instanceArguments['tags'] = _.map @instanceArguments['tags'].split(","), (tag) ->
        return $.trim(tag).toLowerCase()
      @instanceArguments['primaryObject']['tags'] = _.map @instanceArguments['primaryObject']['tags'].split(","), (tag) -> 
        return $.trim(tag).toLowerCase()
      
      fimo.data.post 'jumbles/create', @instanceArguments, =>
        fimo.cache.remove("jumbles")
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