var Race,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __slice = [].slice;

Race = (function() {
  function Race(fn, cb) {
    this.fn = fn;
    this.cb = cb;
    this.fin = __bind(this.fin, this);
    this.times = 0;
    this.finTimes = 0;
  }

  Race.prototype.fin = function() {
    if (this.times === ++this.finTimes) {
      return typeof this.cb === "function" ? this.cb.apply(this, arguments) : void 0;
    }
  };

  Race.prototype.add = function(args) {
    var i;
    i = this.times++;
    return this.fn.apply(this, [i].concat(args.concat(this.fin)));
  };

  return Race;

})();

module.exports = function(fn, cb) {
  var race;
  race = new Race(fn, cb);
  return function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return race.add(args);
  };
};
