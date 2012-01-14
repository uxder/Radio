(function ($) {
  var radio = require('radio');

  function integrate(meth) {
    return function() {
      var r = radio(arguments[0]);
      return r[meth].apply(r, Array.prototype.slice.call(arguments, 1));
    };
  }

  $.ender({
    subscribe: integrate('add'),
    unsubscribe: integrate('remove'),
    broadcast: integrate('broadcast')
  });
}(ender));
