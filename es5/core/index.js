"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _timeline = _interopRequireDefault(require("./timeline"));

var _events = _interopRequireDefault(require("../utiliy/events"));

var _core = _interopRequireDefault(require("../utiliy/core"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Motion = function Motion(configs, events) {
  this.Timelines = [];
  this.LastFrame = 0;
  this._AnimationID;
  this.CurrentFrame = 0;
  this.Repeat = 1;
  this.Events = new _events.default();
  this.Events.binds(events);
  this.add(configs);
};

Motion.prototype = {
  add: function add(configs, ifAppend) {
    var _configs = _core.default.isArray(configs) ? configs : [configs],
        lastFrame = 0,
        zeroFrame = ifAppend ? this.LastFrame : 0;

    for (var i = 0, l = _configs.length; i < l; i++) {
      var timeline = new _timeline.default(_configs[i], zeroFrame);
      this.Timelines.push(timeline);
      lastFrame = Math.max(lastFrame, timeline.LastFrame);
    }

    this.LastFrame = Math.max(this.LastFrame, lastFrame);
    return this;
  },
  append: function append(configs) {
    this.add(configs, true);
    return this;
  },
  bind: function bind(key, func) {
    this.Events.bind(key, func);
    return this;
  },
  run: function run(startFrame, endFrame, resetStart) {
    if (this._AnimationID) {
      return this;
    }

    var start = _core.default.int(startFrame, this.CurrentFrame),
        end = _core.default.int(endFrame, this.LastFrame),
        resetStart = !!resetStart ? start <= end ? 0 : this.LastFrame : start,
        i = start,
        stepLength,
        ifGo,
        me = this;

    if (start <= end) {
      stepLength = 1;

      ifGo = function ifGo() {
        return i <= end;
      };
    } else {
      stepLength = -1;

      ifGo = function ifGo() {
        return i >= end;
      };
    }

    var _run = function _run() {
      me.Events.emit('start');

      if (ifGo()) {
        me.render(i);
        me._AnimationID = requestAnimationFrame(_run);
        i += stepLength;
      } else {
        me.Repeat--;

        if (me.Repeat <= 0) {
          me._AnimationID = null;
          me.Events.emit('end');
          me.Repeat = 1;
        } else {
          i = resetStart;
          me.render(i);
          me._AnimationID = requestAnimationFrame(_run);
        }
      }
    };

    this._complie();

    _run();

    return this;
  },
  _complie: function _complie() {
    _core.default.each(this.Timelines, 'complie');
  },
  state: function state(i, isFromZeroToEnd) {
    if (0 <= i && i <= this.LastFrame) {
      isFromZeroToEnd = isFromZeroToEnd === undefined ? true : !!isFromZeroToEnd;

      this._complie();

      _core.default.each(this.Timelines, 'state', [i, isFromZeroToEnd]);

      this.CurrentFrame = i;
    }
  },
  render: function render(i) {
    this.Events.emit('beforeEach', [i]);

    _core.default.each(this.Timelines, 'render', [i]);

    this.Events.emit('each', [i]);
    this.Events.emit(i);
    this.CurrentFrame = i;
  },
  reverse: function reverse() {
    this.run(this.CurrentFrame > 0 ? this.CurrentFrame : this.LastFrame, 0);
    return this;
  },
  repeat: function repeat(_repeat) {
    this.Repeat = _repeat;
    return this.play();
  },
  play: function play() {
    this.run();
    return this;
  },
  stop: function stop() {
    cancelAnimationFrame(this._AnimationID);
    this._AnimationID = null;
    this.CurrentFrame = 0;
    this.Events.emit('stop');
    return this;
  },
  pause: function pause() {
    cancelAnimationFrame(this._AnimationID);
    this._AnimationID = null;
    this.Events.emit('pause');
    return this;
  },
  isPlaying: function isPlaying() {
    return !!this._AnimationID;
  }
};
var _default = Motion;
exports.default = _default;