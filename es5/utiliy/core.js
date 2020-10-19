"use strict";

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.replace");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var RegInt = /^(-?[1-9]\d*)|0$/;
var Core = {
  guid: function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;
      var v = c === 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  },
  access: function access(elem, key, value, fn) {
    var length = elem.length; // fake bool

    if (typeof length === 'number') {
      for (var i = 0; i < length; i++) {
        fn(elem[i], key, value);
      }
    } else {
      fn(elem, key, value);
    }
  },
  each: function each(elem, funcName, args) {
    var length = elem.length; // fake bool

    if (typeof length === 'number') {
      for (var i = 0; i < length; i++) {
        elem[i][funcName].apply(elem[i], args);
      }
    } else {
      elem[funcName].apply(elem, args);
    }
  },
  toArray: function toArray(obj) {
    return Array.prototype.slice.call(obj);
  },
  isArray: function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  },
  int: function int(num, def) {
    var d = def || 0,
        n;

    if (typeof num === 'number') {
      n = num >> 0;
      return n >= 0 ? n : d;
    }

    return d;
  },
  isInt: function isInt(v) {
    return RegInt.test(v);
  }
};
var _default = Core;
exports.default = _default;