"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = _interopRequireDefault(require("../utiliy/core"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prop = {
  _set: function _set(dom, key, val) {
    dom[key] = val;
  },
  set: function set(dom, key, val) {
    _core.default.access(dom, key, val, this._set);
  },
  _get: function _get(dom, key) {
    return dom[key];
  },
  get: function get(dom, key) {
    return this._get(typeof dom.length === 'number' ? dom[0] : dom, key);
  }
};
var _default = prop;
exports.default = _default;