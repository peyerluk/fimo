fs = require 'fs'
util = require 'util'
{exec} = require 'child_process'

coffeedir = 'coffee'
jsdir = 'js'

lessWatchDir = 'public/less/src'
lessCompileDir = 'public/less'
cssdir = 'public/css'

coffeeOptions = "--bare --output #{jsdir} "
lesscOptions = ""

build = (input, output, callback) ->
  coffee = exec 'coffee', ['-w', '-b', '-c', '-o', output, input]
  coffee.stderr.on 'data', (data) ->
    process.stderr.write data.toString()
  coffee.stdout.on 'data', (data) ->
    util.log data.toString()
  coffee.on 'exit', (code) ->
    callback?() if code is 0

task 'build', 'Build app/ from coffee/', ->
  build("coffee", "app")
  
task 'public', 'Build app/ from coffee/', ->
  build("public/coffee", "public/js")
  

task 'watch', 'Watch for coffeescript and less changes', ->
  util.log "Watching for code changes to:"
  
  # cFiles = fs.readdir("#{coffeedir}", (err, files)->
  #   for file in files
  #     fn = (file) -> 
  #       parts = file.split('.', 1)
  #       if(/(.*)\.(coffee)/i.test(file))
  #         compileCoffee(parts[0])
  #         fileRef = file
  #         util.log " -> #{coffeedir}/#{file}"
  #         fs.watchFile "#{coffeedir}/#{file}", (curr, prev) ->
  #             if +curr.mtime isnt +prev.mtime
  #                 util.log "Saw change in #{coffeedir}/#{fileRef}"
  #                 compileCoffee(parts[0])
  #     fn(file)
  # )
  
  build("coffee", "app")
  
  lFiles = fs.readdir("#{lessWatchDir}", (err, files)->
    for file in files
      fn = (file) ->
        parts = file.split('.', 1)
        if(/(.*)\.(less)/i.test(file))
          util.log " -> #{lessWatchDir}/#{file}"
          # compileLess(parts[0])
          fileRef = file
          fs.watchFile "#{lessWatchDir}/#{file}", (curr, prev) ->
            if +curr.mtime isnt +prev.mtime
              util.log "Saw change in #{lessWatchDir}/#{fileRef}"
              compileLess("fimo") #parts[0]
      fn(file)
  )
  
  util.log "-----------------------------------"
  
  util.log "Performed initial compile. Ready and waiting for changes"

# if you wanted to run these alone then you might as well do it from the command line
compileCoffee = (file) ->
  exec "coffee #{coffeeOptions} #{coffeedir}/#{file}.coffee", (error, stdout, stderr) ->
    util.log(stdout) if stdout
    util.log(stderr) if stderr
  
compileLess = (file) ->
  exec "lessc #{lesscOptions} #{lessCompileDir}/#{file}.less #{cssdir}/#{file}.css", (error, stdout, stderr) ->
    util.log(stdout) if stdout
    util.log(stderr) if stderr