"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = _interopRequireDefault(require("./core"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Events = function Events() {
  this.Events = {};
};

Events.prototype = {
  RegInt: /^[1-9]\d*$/,
  bind: function bind(key, func) {
    if (func._$EventGuid === undefined) {
      func._$EventGuid = _core.default.guid();
    }

    if (this.Events[key] === undefined) {
      this.Events[key] = {};
    }

    this.Events[key][func._$EventGuid] = func;
    return func._$EventGuid;
  },
  binds: function binds(json, base) {
    if (json) {
      var newKey,
          hasBase = typeof base === 'number';

      for (var key in json) {
        newKey = hasBase && this.RegInt.test(key) ? base + key : key;
        this.bind(newKey, json[key]);
      }
    }
  },
  emit: function emit(key, args, caller) {
    var events = this.Events[key];

    if (events) {
      for (var funcGuid in events) {
        events[funcGuid].apply(caller, args);
      }
    }
  },
  // emit with one arg
  fire: function fire(key, args, caller) {
    var events = this.Events[key];

    if (events) {
      for (var funcGuid in events) {
        events[funcGuid].call(caller, args);
      }
    }
  },
  unbind: function unbind(key, funcOrGuid) {
    if (this.Events[key]) {
      var guid = typeof funcOrGuid === 'string' ? funcOrGuid : funcOrGuid._$EventGuid;
      delete this.Events[key][guid];
    }
  }
};
var _default = Events;
exports.default = _default;