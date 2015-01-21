var Pipeline, underscore,
  __slice = [].slice;

underscore = require('underscore');

module.exports = Pipeline = (function() {
  var empty, method, _i, _j, _len, _len1, _ref, _ref1;

  empty = [];

  _ref = 'forEach,indexOf,join,pop,reverse,shift,sort,splice,unshift,push'.split(',');
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    method = _ref[_i];
    Pipeline.prototype[method] = empty[method];
  }

  _ref1 = ('first,initial,last,rest,compact,flatten,without,union,' + 'intersection,difference,uniq,zip,lastIndexOf,range').split(',');
  for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
    method = _ref1[_j];
    Pipeline.prototype[method] = (function(method) {
      return function() {
        return underscore[method].apply(underscore, [this].concat(__slice.call(arguments)));
      };
    })(method);
  }

  function Pipeline(pipeline, queue, callback) {
    this.queue = queue;
    this.length = 0;
    if (pipeline.length) {
      this.push.apply(this, [].slice.call(pipeline));
    }
    Object.defineProperty(this, 'callback', {
      value: callback
    });
  }

  Pipeline.prototype.root = function() {
    var _ref2, _ref3;

    return (_ref2 = this.first()) != null ? (_ref3 = _ref2.nodes) != null ? _ref3[0] : void 0 : void 0;
  };

  return Pipeline;

})();
