"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("./core/index"));

var _index2 = _interopRequireDefault(require("./cpu/index"));

var _index3 = _interopRequireDefault(require("./speed/index"));

var _tween = _interopRequireDefault(require("./math/tween"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mframe = function mframe(configs, events) {
  return new _index.default(configs, events);
};

mframe.Cpu = _index2.default;
mframe.Tween = _tween.default;

mframe.speed = function (configs, events, x) {
  return new _index3.default(configs, events, x);
};

var registerWindow = function registerWindow(name, func) {
  if (typeof window !== 'undefined' && window[name] === undefined) {
    window[name] = func;
  }
};

registerWindow('mf', mframe);
registerWindow('mframe', mframe);
var _default = mframe;
exports.default = _default;