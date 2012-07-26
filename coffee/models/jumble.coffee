mongoose = require("../config/mongodb")
Schema = mongoose.Schema
User = require("./user")
Item = require("./object")
Image = require("./image")

Activity = new Schema({
  itemId      : { type: Schema.ObjectId, ref: 'Item' }
  itemImage   : { type: String }
  activity    : { type: String }    
  happened    : { type: Date, default: Date.now }
})

Jumble = new Schema({
  owner:            { type: Schema.ObjectId, ref: 'User', required: true }
  primaryObject:    { type: Schema.ObjectId, ref: 'Item', required: true }
  name:             { type: String, required: true }
  tags:             { type: [String] }
  objects:          { type: [Item] }
  participants:     { type: [User] }
  activities:       { type: [Activity] }
  coords:           { lon: Number, lat: Number }
  created:          { type: Date, default: Date.now }
  
})

Jumble.methods.clearActivities = () ->
  if @activities.length
    for index in [(@activities.length - 1)..0]
      @activities[index].remove()
      
Jumble.methods.fakeActivity = () ->
  Item.where('jumble', @id ).desc("created").limit(100).run (err, items) =>
      
    # update all items in jumble with random activity
    for item in items
      random = Math.random()
      
      item.lastActivity = 
        if random > 0.85
          "comment"
        else if random > 0.7
          "like"
        else if random > 0.55
          "star"
        else 
          null
      
      # save some activities on jumble
      if item.lastActivity #&& jumble.activities?.length <= 4
        @activities.push(
          itemId: item.id
          itemImage: Image.url(item.image, "100x100")
          activity: item.lastActivity
        )
        
      item.save()
    
    # save
    @save()
    console.log("Faked #{ @name }: #{ @activities.length }")
  

# INDEXES
Jumble.index( { coords: "2d" } )

# EXPORT
JumbleModel = mongoose.model('Jumble', Jumble)
module.exports = JumbleModel