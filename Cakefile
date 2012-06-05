fs = require 'fs'

{print} = require 'util'
{spawn} = require 'child_process'

build = (input, output, callback) ->
  coffee = spawn 'coffee', ['-w', '-b', '-c', '-o', output, input]
  coffee.stderr.on 'data', (data) ->
    process.stderr.write data.toString()
  coffee.stdout.on 'data', (data) ->
    print data.toString()
  coffee.on 'exit', (code) ->
    callback?() if code is 0

task 'build', 'Build lib/ from src/', ->
  build("coffee", "app")