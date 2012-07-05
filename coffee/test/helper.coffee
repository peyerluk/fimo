helper = {
  curry: (callback)->
    curriedArguments = Array.prototype.slice.call arguments
    ->
      args = Array.prototype.slice.call arguments
      allArguments = args.concat curriedArguments
      callback.apply this, allArguments
}

module.exports = helper