var helper;

helper = {
  curry: function(callback) {
    var curriedArguments;
    curriedArguments = Array.prototype.slice.call(arguments);
    return function() {
      var allArguments, args;
      args = Array.prototype.slice.call(arguments);
      allArguments = args.concat(curriedArguments);
      return callback.apply(this, allArguments);
    };
  }
};

module.exports = helper;
