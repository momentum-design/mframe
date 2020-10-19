"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _keyFrames = _interopRequireDefault(require("./keyFrames"));

var _events = _interopRequireDefault(require("../utiliy/events"));

var _index = _interopRequireDefault(require("../cpu/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Timeline = function Timeline(config, zeroFrame) {
  this.Dom = config.dom;
  this.Frames = config.frames;
  this.Storage = _index.default.createStorage();
  this.Events = new _events.default();
  this.Events.binds(config.events);
  this.ZeroFrame = zeroFrame || 0;

  this._scan();
};

Timeline.prototype = {
  _store: function _store(coreName, props, time, tween) {
    if (props === undefined) {
      return;
    }

    var storage = this.Storage[coreName],
        dom = this.Dom;

    for (var propName in props) {
      if (storage[propName] === undefined) {
        storage[propName] = new _keyFrames.default(dom, coreName, propName);
      }

      storage[propName].add(props[propName], time, tween);
    }
  },
  _scan: function _scan() {
    var frames = this.Frames,
        storage = this.Storage,
        frame,
        tween,
        time,
        last = 0;

    for (var i = 0, l = frames.length; i < l; i++) {
      frame = frames[i];
      time = frame.time || 0;
      tween = frame.tween || 'linear';

      for (var coreName in storage) {
        this._store(coreName, frame[coreName], time, tween);
      }

      last = Math.max(time, last);
    }

    this.LastFrame = last;

    this._excuteStorage('preComplie');
  },
  getArgs: function getArgs(index) {
    var storage = this.Storage.arg,
        ret = {},
        val;

    for (var propName in storage) {
      val = storage[propName].Frames[index];

      if (val !== undefined) {
        ret[propName] = val;
      }
    }

    return ret;
  },
  state: function state(i, isFromZeroToEnd) {
    var index;

    if (i < this.ZeroFrame) {
      if (!isFromZeroToEnd) {
        index = this.zeroFrame;
      }
    } else if (i > this.LastFrame) {
      if (isFromZeroToEnd) {
        index = this.LastFrame;
      }
    } else {
      index = i - this.ZeroFrame;
    }

    if (typeof index === 'number') {
      var endFrame = isFromZeroToEnd ? this.ZeroFrame : this.LastFrame;

      this._excuteStorage('state', [index, isFromZeroToEnd, endFrame]);
    }
  },
  render: function render(i) {
    if (i >= this.ZeroFrame && i <= this.LastFrame) {
      var index = i - this.ZeroFrame;
      this.Events.emit('beforeEach', [index]);

      this._excuteStorage('render', [index]);

      this.Events.emit('each', [index, this.getArgs(index)]);
      this.Events.emit(index);
    }
  },
  _excuteStorage: function _excuteStorage(funcName, args) {
    var storage = this.Storage,
        coreStorage;

    for (var n in storage) {
      coreStorage = storage[n];

      for (var m in coreStorage) {
        coreStorage[m][funcName].apply(coreStorage[m], args);
      }
    }
  },
  complie: function complie() {
    this._excuteStorage('complie');
  }
};
var _default = Timeline;
exports.default = _default;