const RegUpperLetter = /^[A-Z]/;

const Core = {
  create: function (tag) {
    if (process && process.env && process.env.NODE_ENV === 'test') {
      return document.createElement(tag);
    } else {
      return document.createElementNS("http://www.w3.org/2000/svg", tag);
    }
  },
  guid: function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = Math.random() * 16 | 0;
      let v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },
  // to be used or removed
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
  isArguments: function (obj) {
    return Object.prototype.toString.call(obj) === '[object Arguments]';
  },
  lowerCase: function (word) {
    return word.toLocaleLowerCase();
  },
  lowerCaseInital: function (word) {
    return word.replace(RegUpperLetter, this.lowerCase);
  },
  getReturnOrValue: function (config, d, i) {
    if (typeof config === 'function') {
      return config(d, i);
    } else {
      return config;
    }
  },
  int: function (num, def) {
    let d = def || 0,
      n;
    if (typeof num === 'number') {
      n = num >> 0;
      return n >= 0 ? n : d;
    }
    return d;
  }
};

export default Core;
