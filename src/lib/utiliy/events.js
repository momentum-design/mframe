import core from './core';

var Events = function () {
  this.Events = {};
};
Events.prototype = {
  RegInt: /^[1-9]\d*$/,
  bind: function (key, func) {
    if (func._$EventGuid === undefined) {
      func._$EventGuid = core.guid();
    }
    if (this.Events[key] === undefined) {
      this.Events[key] = {};
    }
    this.Events[key][func._$EventGuid] = func;
    return func._$EventGuid;
  },
  binds: function (json, base) {
    if (json) {
      var newKey,
        hasBase = typeof base === 'number';
      for (var key in json) {
        newKey = hasBase && this.RegInt.test(key) ? base + key : key;
        this.bind(newKey, json[key]);
      }
    }
  },
  emit: function (key, args, caller) {
    var events = this.Events[key];
    if (events) {
      for (var funcGuid in events) {
        events[funcGuid].apply(caller, args);
      }
    }
  },
  // emit with one arg
  fire: function (key, args, caller) {
    var events = this.Events[key];
    if (events) {
      for (var funcGuid in events) {
        events[funcGuid].call(caller, args);
      }
    }
  },
  unbind: function (key, funcOrGuid) {
    if (this.Events[key]) {
      var guid = typeof funcOrGuid === 'string' ? funcOrGuid : funcOrGuid._$EventGuid;
      delete this.Events[key][guid];
    }
  }
};

export default Events;
