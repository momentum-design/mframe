"use strict";

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.match");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var Color = {
  RegNum: /(-?\d+)(\.\d+)?/g,
  toRgbaArr: function toRgbaArr(val) {
    var r,
        g,
        b,
        a = 1;

    if (val[0] === '#') {
      var step = val.length === 4 ? 1 : 2;
      r = parseInt(val.slice(1, 1 + step), 16);
      g = parseInt(val.slice(1 + step, 1 + step * 2), 16);
      b = parseInt(val.slice(1 + step * 2, 1 + step * 3), 16);
    } else {
      var m = val.match(this.RegNum);
      r = +m[0];
      g = +m[1];
      b = +m[2];
      a = m.length > 3 ? +m[3] : 1;
    }

    return [r, g, b, a];
  },
  toRgba: function toRgba(rgbaArr) {
    return 'rgba(' + rgbaArr.join(',') + ')';
  },
  toHex: function toHex(rgbaArr) {
    return '#' + this.to16(rgbaArr[0]) + this.to16(rgbaArr[1]) + this.to16(rgbaArr[2]);
  },
  to16: function to16(val) {
    var v = val.toString(16);
    return v.length === 1 ? '0' + v : v;
  }
};
var _default = Color;
exports.default = _default;