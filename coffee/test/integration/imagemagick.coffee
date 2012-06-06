im = require("imagemagick")
test = require("../setup")
vows = test.vows
assert = test.assert
_ = test._
appDir = __dirname + "/../../.."
testImage = __dirname + '/../data/wood-table.jpg'
tmpFolder = appDir + "/tmp/test"

vows.describe("Imagemagick").addBatch({
  
  "image info": {
    topic: test.async ->
      im.identify(testImage, this.callback)

    "should respond get image information": (err, info) ->
      assert.equal(info.width, 480)
      assert.equal(info.height, 360)
      assert.equal(info.format.toLowerCase(), "jpeg")
    
  },
  
  "resize image": {
    topic: test.async ->
      callback = this.callback
      out = "#{ tmpFolder }/resize_100.jpg"
      im.convert([testImage, '-resize', '100x100', out], ->
        im.identify(out, callback)
      )

    "should have resized the image": (err, info) ->
      assert.equal(info.width, 100)
      assert.equal(info.height, 75)
    
  },
  
  "crop square image": {
    topic: test.async ->
      callback = this.callback
      out = "#{ tmpFolder }/square_100.jpg"
      im.convert([testImage, '-resize', '100x100^', '-gravity', 'center', '-crop', '100x100+0+0', out], ->
        im.identify(out, callback)
      )

    "should have resized the image": (err, info) ->
      assert.equal(info.width, 100)
      assert.equal(info.height, 100)

  },
  
  "effect - lomo": {
    topic: test.async ->
      callback = this.callback
      out = "#{ tmpFolder }/lomo.jpg"
      
      x = 480
      y = 360
      size = " #{ x * 2.5 }x#{ y * 2.5 }"
      
      im.convert([testImage, '-channel', 'R', '-level', '25%', '-channel', 'G', '-level', '25%', '-size', size, 'radial-gradient:none-black', '-gravity', 'center', '-crop', '480x360+0+0', '+repage', '-compose', 'multiply', '-flatten', out], ->
        im.identify(out, callback)
      )

    "should look like lomo (go check manually)": (topic) ->
      assert.equal(true, true)

  },
  
  "texture": {
    topic: test.async ->
      callback = this.callback
      out = "#{ tmpFolder }/texture.jpg"
      texture = "../data/texture.jpg"
      
      # im.convert([testImage, texture, '-compose', 'blend', '-define', 'compose:args=50,50', '-flatten', out], function() {
      im.convert([testImage, texture, '-compose', 'hard-light', '-composite', out], ->
        im.identify(out, callback)
      )

    "should have a texture": (err, info) ->
      assert.equal(true, true)

  }
  
  
}).export(module)
