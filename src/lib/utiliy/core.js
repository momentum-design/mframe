var Core = {
  guid: function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;
      var v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },
  access: function (elem, key, value, fn) {
    var length = elem.length;
    // fake bool
    if (typeof length === 'number') {
      for (var i = 0; i < length; i++) {
        fn(elem[i], key, value);
      }
    } else {
      fn(elem, key, value);
    }
  },
  each: function (elem, funcName, args) {
    var length = elem.length;
    // fake bool
    if (typeof length === 'number') {
      for (var i = 0; i < length; i++) {
        elem[i][funcName].apply(elem[i], args);
      }
    } else {
      elem[funcName].apply(elem, args);
    }
  },
  toArray: function (obj) {
    return Array.prototype.slice.call(obj);
  },
  isArray: function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  },
  int: function (num, def) {
    var d = def || 0,
      n;
    if (typeof num === 'number') {
      n = num >> 0;
      return n >= 0 ? n : d;
    }
    return d;
  }
};

export default Core;
