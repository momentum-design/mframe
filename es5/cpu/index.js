"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _css = _interopRequireDefault(require("./css"));

var _attr = _interopRequireDefault(require("./attr"));

var _prop = _interopRequireDefault(require("./prop"));

var _arg = _interopRequireDefault(require("./arg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Cpu = {
  Cores: {
    css: _css.default,
    attr: _attr.default,
    prop: _prop.default,
    arg: _arg.default
  },
  install: function install(name, core) {
    this.Cores[name] = core;
  },
  uninstall: function uninstall(name) {
    delete this.Cores[name];
  },
  createStorage: function createStorage() {
    var storage = {};

    for (var name in this.Cores) {
      storage[name] = {};
    }

    return storage;
  },
  core: function core(name) {
    return this.Cores[name];
  }
};
var _default = Cpu;
exports.default = _default;